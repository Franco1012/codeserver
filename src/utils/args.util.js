import { Command } from "commander";
const args=new Command() //me va a permitir configurar los distintos argumentos del script

args.option('-p <port>','puerto de escucha del servidor',8080)
args.option('--env <env>','environment','dev')
args.option('--persistence <pers>','persistence','mongo')
args.parse()//cerramos la configuración

export default args.opts()