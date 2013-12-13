(function() {

	/*
	 * Event dispatcher
	 */
	function EventDispatcher() {}
	EventDispatcher.prototype.events = {};
	EventDispatcher.prototype.on = function(type, func) {
		if ( !this.events.hasOwnProperty(type) ) {
			this.events[type] = [];
		}
		this.events[type].push(func);
	}
	EventDispatcher.prototype.off = function(type, func) {
		if ( this.events.hasOwnProperty(type) ) {
			for ( var i in this.events[type] ) {
				if ( this.events[type][i] === func ) {
					this.events[type].splice(i, 1);
				}
			}
		}
	}
	EventDispatcher.prototype.trigger = function(type, data) {
		if ( this.events.hasOwnProperty(type) ) {
			data = data || {};
			for ( var i in this.events[type] ) {
				this.events[type][i]( data );
			}
		}
	}
	
	/*
	 * Main App object
	 */
	var app = new EventDispatcher();
	app.state = 'SEARCH';
	app.sources = {
		caniuse: true,
		es5: true
	};
	app.data = {};

	/*
	 * Core logic
	 */

	app.focusSearchInput = function() {
		document.getElementById('search-input').focus();
	};

	app.loadData = function() {
		var req = new XMLHttpRequest();
		req.open('GET', 'data.json', true);
		req.onload = function() {
			app.data = JSON.parse( req.responseText );
			app.trigger('init');
		};
		req.send();
	};

	app.on('init', function() {
		console.log('init event received');

		app.focusSearchInput();

		Array.prototype.forEach.call( document.querySelectorAll('.sources .source'), function(el) {
			el.addEventListener('click', function() {
				var sourceName = this.getAttribute('data-name'),
				    sourceState = this.classList.contains('checked');

				console.log( sourceName, sourceState );

				this.classList.toggle('checked');
				app.sources[sourceName] = !sourceState;
				app.trigger('sourcelistchange');
			}, false);
		});

		document.getElementById('search-input').addEventListener('change', function(evt) {
			app.trigger('searchinput');
		}, false);
	});

	app.on('sourcelistchange', function() {
		console.log('sourcelistchange event received');

		app.focusSearchInput();
	});

	app.on('searchinput', function() {
		
	});


	/*
	 * Initialization
	 */
	document.addEventListener( 'DOMContentLoaded', function() {
	    document.removeEventListener( 'DOMContentLoaded', arguments.callee, false);
	    init();
	}, false );

	function init() {
		window.app = app;
	    app.loadData();
	}

})();