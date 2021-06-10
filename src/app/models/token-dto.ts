import { Rol } from "./rol";

export class TokenDto {
    value: string;
    roles: Rol[];

    constructor (value: string) {
        this.value = value
    }
}
