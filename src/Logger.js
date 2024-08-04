class Logger {

    error(error){
        console.error(error?.message || error, error?.stack);
    }
}

const logger = new Logger();

export { logger };