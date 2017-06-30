var FN_ARGS = /^\s*[^\(]*\(\s*([^\)]*)\)/m;
var FN_ARG_SPLIT = /,/;
var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

var di = {
    annotate: function annotate(fn){
        var $inject
        if (!($inject = fn.$inject)) {
            $inject = [];
            var fnText = fn.toString().replace(STRIP_COMMENTS, '');
            var argDecl = fnText.match(FN_ARGS);
            argDecl[1].split(FN_ARG_SPLIT).forEach(function(arg){
                arg.replace(FN_ARG, function(all, underscore, name){
                    $inject.push(name);
                });
            });
            fn.$inject = $inject;
        }

        return fn.$inject;
    },
    inject: function(fn, obj){
        var args = [];
        
        if(!fn.$inject){
            this.annotate(fn);
        }

        fn.$inject.forEach(function(argName){
          if(obj[argName]){
            args.push(obj[argName]);
          }else{
            args.push(null); 
          }
        });
        return function(context){
            return fn.apply(context || null, args);
        }  
    }
};



module.exports = di;