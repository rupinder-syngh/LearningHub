const Course = require('../../models/course');

const getCourses = async (req, res) => {
    try {
        const { category, skip: coursesToSkip } = req.query;
        const coursesCount = await Course.find({ category }).count();
        const courses = await Course.find({ category }, {
            title: 1, description: 1, duration: 1, posterUrl: 1,
        }).sort({ createdAt: 1 }).limit(10)
            .skip(coursesToSkip);
        return res.status(200).json({
            message: 'Success',
            data: {
                coursesCount,
                courses,
            },
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message,
        });
    }
};

module.exports = getCourses;
