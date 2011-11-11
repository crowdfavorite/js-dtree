/*
 * dTree 1.0
 * Crowd Favorite
 */
;(function($) {
	var DTree = function ($tree, opts, callback) {
		$.extend(this.opts, opts);
		
		opts = this.opts;
		
		$tree
			.attr('role','tree')
			.addClass(opts.trunkClass);

		$tree.find('ul, ol')
			.attr('role','group')
			.addClass(opts.groupClass);

		$tree.find('li')
			.attr('role','treeitem')
			.addClass(opts.branchClass);
		
		$tree.find('li:has(ul), li:has(ol)')
			.addClass(opts.branchHasGroupClass)
			.each($.proxy(function (i , current) {
				var $branch = $(current),
					$toggle = this.createToggle($branch);
				
				this.closeGroup($toggle);
				
				$branch.prepend($toggle);
			}, this));
	};
	DTree.prototype = {
		opts: {
			/* Root ul element */
			trunkClass: 'tree',
			/* nested uls */
			groupClass: 'group',
			/* li elements */
			branchClass: 'branch',
			branchHasGroupClass: 'has-group',
			groupToggleClass: 'toggle',
			groupOpenClass: 'open',
			groupClosedClass: 'closed',
			groupKey: 'for.cf',
			branchKey: 'branch.cf'
		},
		
		createToggle: function ($branch) {
			var opts = this.opts,
				$group = $branch.find('> ul, > ol'),
				$toggle;
			
			$toggle = $('<span/>')
				.addClass(opts.groupToggleClass)
				.data(opts.groupKey, $group)
				.data(opts.branchKey, $branch)
				
				.click($.proxy(function (e) {
					var $this = $(e.currentTarget),
						$branch = $this.data(opts.branchKey);

					if ($branch.hasClass(opts.groupOpenClass)) {
						this.closeGroup($this);
					}
					else {
						this.openGroup($this);
					};
				}, this));
			return $toggle;
		},
		
		openGroup: function ($toggle) {
			$toggle.each($.proxy(function(i, toggle){
				var opts = this.opts,
					$toggle = $(toggle),
					$branch = $toggle.data(opts.branchKey);

				$branch
					.addClass(opts.groupOpenClass)
					.removeClass(opts.groupClosedClass)
					.attr('aria-expanded', 'true');
			}, this));
		},
		
		closeGroup: function ($toggle) {
			$toggle.each($.proxy(function (i, toggle) {
				var opts = this.opts,
					$toggle = $(toggle),
					$branch = $toggle.data(opts.branchKey),
					$group = $toggle.data(opts.groupKey);

				$branch
					.addClass(opts.groupClosedClass)
					.removeClass(opts.groupOpenClass)
					.attr('aria-expanded', 'false');

				// Trigger nested toggles
				this.closeGroup($('.'+opts.groupToggleClass, $group));
			}, this));
		}
	};
	
	$.fn.dtree = function(opts) {
		new DTree(this, opts);
	};
})(jQuery);