export const errorHandler = (code , message)=>{
    const error = new Error();
    error.statusCode = code ;
    error.message = message;
    console.log(error);
    return error;
}