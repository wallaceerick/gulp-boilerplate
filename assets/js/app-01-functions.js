/***************************************
File Name: Functions.js
Creator: Wallace Erick <wallace_erick@hotmail.com>
Reference: http://youmightnotneedjquery.com/
***************************************/

// Manipulação do DOM
function qS(el){
	return document.querySelector(el);
}

function qSA(el){
	return document.querySelectorAll(el);
}

function after(el, string){
	el.insertAdjacentHTML('afterend', string);
}

function before(el, string){
	el.insertAdjacentHTML('beforebegin', string);
}

function clone(el){
	el.cloneNode(true);
}

function append(el){
	parent.appendChild(el);
}

function empty(el){
	el.innerHTML = '';
}

function find(selector){
	el.qSA(selector);
}

function append(el){
	parent.appendChild(el);
}


// Troca de Classes
function hasClass(el, className){
	if(el.classList){
    return el.classList.contains(className);
  } else {
   	return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
  }
}

function addClass(el, className){
	if(el.classList){
		el.classList.add(className);
	} else if  (!hasClass(el, className)) {
		el.className += ' ' + className;
	}
}

function removeClass(el, className){
	if (el.classList){
   	el.classList.remove(className);
  } else if (hasClass(el, className)) {
   	var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
   	el.className=el.className.replace(reg, ' ');
  }
}


// Efeitos
function fadeIn(el){
	el.classList.add('fade-in');
	el.classList.remove('fade-out');
}

function fadeOut(el){
	el.classList.add('fade-out');
	el.classList.remove('fade-in');
}

function hide(el){
	el.style.display = 'none';
}

function show(el){
	el.style.display = '';
}