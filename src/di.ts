const FN_ARGS = /^\s*[^\(]*\(\s*([^\)]*)\)/m;
const FN_ARG_SPLIT = /,/;
const FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

export function annotate(fn) {
    let $inject
    if (!($inject = fn.$inject)) {
        $inject = [];
        const fnText = fn.toString().replace(STRIP_COMMENTS, '');
        const argDecl = fnText.match(FN_ARGS);
        argDecl[1].split(FN_ARG_SPLIT).forEach(function (arg) {
            arg.replace(FN_ARG, function (all, underscore, name) {
                $inject.push(name);
            });
        });
        fn.$inject = $inject;
    }

    return fn.$inject;
};

export function inject(fn, obj): Function {
    const args = [];

    if (!fn.$inject) {
        this.annotate(fn);
    }

    fn.$inject.forEach(function (argName) {
        if (obj[argName]) {
            args.push(obj[argName]);
        } else {
            args.push(null);
        }
    });
    return function (context) {
        return fn.apply(context || null, args);
    }
}