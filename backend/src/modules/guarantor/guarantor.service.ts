import { ConflictError, NotFoundError } from "../../common/errors";
import guarantorRepository from "./guarantor.repository";
import {
  CreateGuarantorDto,
  UpdateGuarantorDto,
} from "./guarantor.validation";

class GuarantorService {
  async create(data: CreateGuarantorDto) {
    const existing = await guarantorRepository.findByNrc(data.nrc);

    if (existing) {
      throw new ConflictError("Guarantor with this NRC already exists.");
    }

    return guarantorRepository.create(data);
  }

  async findAll() {
    return guarantorRepository.findAll();
  }

  async findById(id: string) {
    const guarantor = await guarantorRepository.findById(id);

    if (!guarantor) {
      throw new NotFoundError("Guarantor not found.");
    }

    return guarantor;
  }

  async update(id: string, data: UpdateGuarantorDto) {
    await this.findById(id);

    return guarantorRepository.update(id, data);
  }

  async delete(id: string) {
    await this.findById(id);

    return guarantorRepository.delete(id);
  }
}

export default new GuarantorService();