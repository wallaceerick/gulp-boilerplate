// Define your custom commands and emoji
var commands = [
    ['unicorn',    '🦄'],
    ['pizza',      '🍕'],
    ['beer',       '🍺'],
    ['poo',        '💩'],
    ['love',       '❤️'],
    ['flash',      '⚡️'],
    ['flower',     '🌸'],
    ['brasil',     '🇧🇷'],
    ['eye',        '👀'],
    ['smiley',     '😎'],
    ['good',       '👍'],
    ['hand',       '👊'],
    ['fuck',       '🖕'],
    ['speak',      '🗣'],
    ['dog',        '🐶'],
    ['cat',        '🐱'],
    ['mouse',      '🐭'],
    ['pig',        '🐷'],
    ['monkey',     '🐵'],
    ['chick',      '🐥'],
    ['bee',        '🐝'],
    ['spider',     '🕷'],
    ['snake',      '🐍'],
    ['turtle',     '🐢'],
    ['scorpion',   '🦂'],
    ['cactus',     '🌵'],
    ['palm',       '🌴'],
    ['fire',       '🔥'],
    ['sun',        '☀️'],
    ['twist',      '🌪'],
    ['ball',       '⚽️']
];
  
(function() {
    if(!window.console) return;
        // Create custom commands
        commands.forEach(function(command) {
            window.console[command[0]] = function() {

            // Get arguments as a string
            var args = Array.prototype.slice.call(arguments).toString().split(',').join(', ');

            // Log to the console with emoji
            console.log(command[1] + ' ' + args + ' ' + command[1]);
        }
    });
})();