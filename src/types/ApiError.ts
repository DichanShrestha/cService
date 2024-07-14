import { NextResponse } from "next/server";

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export const errorHandler = (err: any, res: typeof NextResponse) => {
  let status = 500;
  let message = "Internal Server Error";

  if (err instanceof ApiError) {
    status = err.status;
    message = err.message;
  } else if (err.name === "ValidationError") {
    status = 400;
    message = err.message;
  }

  return res.json(
    {
      success: false,
      message,
    },
    { status }
  );
};
