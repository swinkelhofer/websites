/*

*/

/* Include jQuery if not already included */
if(typeof jQuery=='undefined')
{
	var jQuery = document.createElement('script');
	jQuery.type = 'text/javascript';
	jQuery.src = 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js';
	jQuery.onload = waitForJQuery;
	document.getElementsByTagName("head")[0].appendChild(jQuery);
}
else
	waitForJQuery();

/* Trigger if jQuery is loaded */
function waitForJQuery()
{
	/* Include CSS */
	$("<link rel='stylesheet' type='text/css' href='jInputSuite.css'>").appendTo('head');

	/* Document.ready -> replace native elements */
	$(document).ready(function(){
		$('input[type=checkbox].jCheckbox').each(function(index, e) { buildToggler($(e)); });
	});

	/* Functions for creating and functionality of jCheckboxes */
	function buildToggler(e)
	{
		id = e.attr('id');
		if(e.hasClass('square'))
			$("<div class='togglewrapper square' id='wrapper"+ id +"'></div>").insertAfter(e);
		else
			$("<div class='togglewrapper' id='wrapper"+ id +"'></div>").insertAfter(e);
		e.detach().prependTo("#wrapper"+id);
		$("<span class='toggler'></span>").insertAfter(e).click(function(){ togglerClicked($(this).parent()); });
		$("<span class='togglebase'></span>").insertAfter(e).click(function(){ togglerClicked($(this).parent()); });
		e.click(function(){ togglerClicked($(this).parent()); });
		if(e.is(':checked'))
		{
			e.parent().children().addClass('checked');
			color(e, 'hcol');
		}
		else
		{
			e.parent().children().removeClass('checked');
			color(e, 'bcol');
		}
		
	}
	function togglerClicked(e)
	{
		e.find('input[type=checkbox]').click();
		if(e.find('input[type=checkbox]').is(':checked'))
		{
			e.children().addClass('checked');
			color(e.find('input[type=checkbox]'), 'hcol');
		}
		else
		{
			e.children().removeClass('checked');
			color(e.find('input[type=checkbox]'), 'bcol');
		}
	}
	/* Endof jCheckboxes */


	/* Common functions */
	function color(e, hORb)
	{
		var col = e.attr(hORb);
		if(typeof col !== typeof undefined && col !== false)
			e.parent().find('.togglebase').css('background-color', col);
	}
	/* Endof common functions */
}