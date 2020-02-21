import { Service } from "@tsed/common";
import { TypeORMService } from "@tsed/typeorm";
import { Connection } from "typeorm";
import { Viewsheds } from "../../entity/phibc-post-proc-results/Viewsheds";

@Service()
export class ViewshedsService {
    private connection: Connection;

    constructor(private typeORMService: TypeORMService) {
    }

    $afterRoutesInit() {
        this.connection = this.typeORMService.get();
    }

    async find(): Promise<Viewsheds[]> {
        let bds: any[] = await this.connection.manager.find(Viewsheds);
        return bds;
    }

    async findOne(id: number): Promise<Viewsheds> {
        const bd = await this.connection.manager.findOne(Viewsheds, id);
        return bd;
    }

}
