import minimist from 'minimist';
import _ from 'underscore';
import { StreamsHelpers } from './streamsHelpers';

function run() {
    const minimistConfig = {
      alias: {
          'help': 'h',
          'action': 'a',
          'file': 'f',
          'path': 'p'
      }
    };
    const helper = new StreamsHelpers();
    const args = minimist(process.argv.slice(2), minimistConfig);
    
    const argsAsArr = _.pairs(args).filter((item) => {
        if (item[0].length > 1) {
            return item;
        }
    });
    if (argsAsArr.length === 0) {
        console.log('Wrong arguments input');
        return null;
    }
    if(argsAsArr[0][0] === 'help') {
        console.log('You can use next arguments --action -a --file -f');
        return null;
    }
    switch (args.action) {
        case 'io': {
            helper.readFromFile(args.file).pipe(helper.writeToStdOut());
            break;
        }
        case 'transform-file': {
            helper.readFromFile(args.file).pipe(helper.transformCsvToJSON()).pipe(helper.writeToFile());
            break;
        }
        case 'transform': {
            helper.readFromFile(args.file).pipe(helper.transformCsvToJSON()).pipe(helper.writeToStdOut());
            break;
        }
        case 'bundle-css': {
            console.log('transform action');
            helper.cssBundler(args.path, 'https://www.epam.com/etc/clientlibs/foundation/main.min.fc69c13add6eae57cd247a91c7e26a15.css');
            break;
        }
        default: {
            console.log('Unsupported command');
        }
    }
}

if(module.parent) {
    exports.StreamsHelpers = StreamsHelpers;
} else {
    run();
}