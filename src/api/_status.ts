import express from 'express';

export function _200(res: express.Response, data: any, message: string = "success") {
  return res.status(200).json({
    result: data,
    isError: false,
    message
  });
}

export function _401(res: express.Response) {
  return res.status(401).json({
    result: null,
    isError: true,
    message: "Unauthorized"
  });
}

export function _400(res: express.Response, message: string = "Bad request.") {
  return res.status(400).json({
    result: null,
    isError: true,
    message
  });
}

export function _500(res: express.Response, message: string) {
  return res.status(500).json({
    result: null,
    isError: true,
    message
  });
}