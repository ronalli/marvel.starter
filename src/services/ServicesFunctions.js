
const ServicesFunctions = {

	transformImage(srcImage) {
		let style = { 'objectFit': 'cover' };
		if (srcImage.indexOf('image_not_available') > 0) style = { 'objectFit': 'unset' };
		return style;
	}

}

export default ServicesFunctions;