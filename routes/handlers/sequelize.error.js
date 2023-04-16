module.exports = (error) => {
	if (error.name === "SequelizeUniqueConstraintError") {
		return error.errors[0].path + " already exists";
	} else if (error.name === "SequelizeValidationError") {
		console.log(error);
		return error.errors[0].message;
	}
	return error.message;
};
