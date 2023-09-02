"use client";
import { useEffect } from "react";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <>
      {error.message ||
        "An issue happened on our end please come back later from error page"}
      <button type="button" onClick={() => reset()}>
        Try Again
      </button>
    </>
  );
}
