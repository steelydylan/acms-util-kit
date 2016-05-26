(function(){
	var ACMS = {
		Library:{
			googleCodePrettifyPost:function(){
			    $('pre').addClass('prettyprint linenums');
			    if ( !$('pre').hasClass('prettyprinted') && !$('pre').hasClass('acms-admin-customfield-maker') ) {
			        prettyPrint();
			    }
			}
		},
		Dispatch:{
			_tooltip: function ( elm, hover )
			{
			    var $of = $(elm);

			    if ( hover !== false ) {
			        var contents    = "";
			        var $contents   = $of.data('acms-tooltip');
			        var $position   = $of.data('acms-position');
			        if ( $contents ) contents    = $contents;
			        var $tooltip    = $($.parseHTML('<div class="js-tooltip acms-admin-tooltip acms-tooltip">'+contents+'</div>'));
			        var $pos = {
			            'of'    : $of,
			            'at'    : 'center top',
			            'my'    : 'center bottom-5'
			        };
			        switch ( $position ) {
			            case 'right' :
			                $pos = {
			                    'of'    : $of,
			                    'at'    : 'right center',
			                    'my'    : 'left+5 center'
			                };
			                $tooltip.addClass('right');
			                break;
			            case 'left' :
			                $pos = {
			                    'of'    : $of,
			                    'at'    : 'left center',
			                    'my'    : 'right-5 center'
			                };
			                $tooltip.addClass('left');
			                break;
			            case 'bottom' :
			                $pos = {
			                    'of'    : $of,
			                    'at'    : 'center bottom',
			                    'my'    : 'center top+5'
			                };
			                $tooltip.addClass('bottom');
			                break;
			            case 'top' :
			                $tooltip.addClass('top');
			            default :
			                break;
			        }

			        $('.js-tooltip').remove();

			        $('body').append($tooltip);
			        $tooltip.position($pos).css('visibility', 'visible');
			    } else if ( hover === false ) {
			        $('.js-tooltip').remove();
			    }

			    if ( hover === undefined ) {
			        $(document).unbind('click.tooltip');
			        $(document).bind('click.tooltip', function ( )
			        {
			            $('.js-tooltip').remove();
			            $(document).unbind('click.tooltip');
			        });
			    }
			}
		}
	};
	window.ACMS = ACMS;
})();