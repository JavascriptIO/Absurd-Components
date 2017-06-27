

declare var anime: any;
// export = anime;
// Temporal fix
// author https://github.com/kohashi/types-npm-animejs
declare module "animejs" {
    export default anime;
}
