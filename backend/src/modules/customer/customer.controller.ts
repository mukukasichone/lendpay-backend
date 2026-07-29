import { NextFunction, Request, Response } from "express";
import customerService from "./customer.service";

class CustomerController {
  async createCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const customer = await customerService.createCustomer(req.body);

      res.status(201).json({
        success: true,
        data: customer,
      });
    } catch (error) {
      next(error);
    }
  }

  async findCustomerById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const customer = await customerService.findCustomerById(id);

      res.status(200).json({
        success: true,
        data: customer,
      });
    } catch (error) {
      next(error);
    }
  }

  async findCustomerByCustomerNo(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const customerNo = req.params.customerNo as string;
      const customer = await customerService.findCustomerByCustomerNo(
        customerNo
      );

      res.status(200).json({
        success: true,
        data: customer,
      });
    } catch (error) {
      next(error);
    }
  }

  async findCustomerByMobileNumber(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const mobileNumber = req.params.mobileNumber as string;
      const customer = await customerService.findCustomerByMobileNumber(
        mobileNumber
      );

      res.status(200).json({
        success: true,
        data: customer,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllCustomers(req: Request, res: Response, next: NextFunction) {
    try {
      const customers = await customerService.getAllCustomers();

      res.status(200).json({
        success: true,
        data: customers,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const customer = await customerService.updateCustomer(id, req.body);

      res.status(200).json({
        success: true,
        data: customer,
      });
    } catch (error) {
      next(error);
    }
  }

  async deactivateCustomer(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.params.id as string;
      const customer = await customerService.deactivateCustomer(id);

      res.status(200).json({
        success: true,
        data: customer,
      });
    } catch (error) {
      next(error);
    }
  }

  async activateCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const customer = await customerService.activateCustomer(id);

      res.status(200).json({
        success: true,
        data: customer,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CustomerController();