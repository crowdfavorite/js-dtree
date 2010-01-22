/*
 * dTree 1.0
 * Crowd Favorite
 */
(function($) {
	$.fn.dtree = function() {
		this
			.attr('role','tree')
			.attr('tabindex','0')
			.addClass('dtree');

		this.find('li')
			.attr('role','treeitem')
			.attr('tabindex','-1')
			.addClass('dtree_treeitem');

		this.find('li ul').attr('role','group').addClass('dtree_group');

		this.find('li:has(ul)')
			.addClass('dtree_expanded_false')
			.addClass('dtree_has_ul')
			.attr('aria-expanded','false');

		this.find('.dtree_toggle_custom')
			// You can use your own custom toggle
			.addClass('dtree_toggle_expanded_false');

		this.find('li:has(ul):not(:has(.dtree_toggle_custom))')
			.prepend('<span title="Toggle branch" class="dtree_toggle dtree_toggle_expanded_false" role="presentation"></span>')

		this.find('.dtree_toggle, .dtree_toggle_custom')
			.click(function(){
				var _this = $(this);
				var _thisParent = _this.parent('li:has(ul)');
				_this
					.toggleClass('dtree_toggle_expanded_false')
					.toggleClass('dtree_toggle_expanded_true');
				_thisParent
					.toggleClass('dtree_expanded_false')
					.toggleClass('dtree_expanded_true');
				if (_thisParent.attr('aria-expanded') == 'false') {
					_thisParent.attr('aria-expanded','true');
				} else {
					_thisParent.attr('aria-expanded','false');
				}
				return false; // for custom toggles that are links
			});
	};
})(jQuery);