export interface User{
    IdUsuario?: number,
    Cedula: string,
    Nombres: string,
    Apellidos: string,
    NombreCompleto: string,
    FechaDeNacimientoText: string,
    FechaNacimiento: Date,
    Sexo: string,
    Correo: string,
    Clave: string,
    IdRol: number,
    IdPrograma?: number
}