import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt";

//*En NestJS, cualquier servicio, guard o estrategia es un proveedor (provider), por lo cual tenemos que colocar @Injectable
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    //*constructor sirve para inicializar y configurar la estrategia
    //*configService que sirve para para extraer las variables de entorno
    constructor(configService: ConfigService) {
        //*super sirve para llamar al constructor de la clase padre PassportStrategy 
        super({
            //*obtiene el token de el header
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            //*aqui colocamos la clave secreta para que verifique el token
            secretOrKey: configService.getOrThrow<string>("JWT_SECRET")
        })
    }
    //todo: si el token es valido (la firma y no ha expirado) passport decodifica el tojen  y pasa el payload al metodo validate

    //*toma el payload del token y devuelve el objeto que se va a guardar en el request para pueda ser
    //*llamado en cualquier parte del codigo 
    async validate(payload: any) {
        return { id: payload.id, role: payload.role }
    }
}