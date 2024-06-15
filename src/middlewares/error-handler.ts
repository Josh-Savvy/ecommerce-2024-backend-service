import { Request, Response, NextFunction } from "express";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error(err.stack);
	// todo: logger
	res.status(500).json({ message: "Internal Server Error" }).end();
};

export default errorHandler;
