export default {
	animateRef(ref, delay, addClasses, removeClasses) {
		removeClasses = removeClasses || ['none'];
		addClasses = ['block'].concat(addClasses || []);
		setTimeout(function(){
			let list = this.refs[ref].getDOMNode().classList;
			addClasses.map((el) => {
				list.add(el);
			});
			removeClasses.map((el) => {
				list.remove(el);
			});
		}.bind(this), delay);
	}
};
