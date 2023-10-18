"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorRouters = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const tutor_validation_1 = require("./tutor.validation");
const tutor_controller_1 = require("./tutor.controller");
const user_validation_1 = require("../user/user.validation");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.post('/signup', (0, validateRequest_1.default)(tutor_validation_1.TutorValidation.createTutorZodSchema), tutor_controller_1.TutorController.createTutor);
router.post('/login', (0, validateRequest_1.default)(user_validation_1.UserValidation.loginZodSchema), tutor_controller_1.TutorController.loginTutor);
router.patch('/change-password', (0, auth_1.default)(user_1.ENUM_USER_ROLE.TUTOR), (0, validateRequest_1.default)(user_validation_1.UserValidation.changePasswordZodSchema), tutor_controller_1.TutorController.changePassword);
router.get('/profile', (0, auth_1.default)(user_1.ENUM_USER_ROLE.TUTOR), tutor_controller_1.TutorController.ownProfile);
router.get('/single-tutor/:id', tutor_controller_1.TutorController.getSingleTutorByUser);
router.get('/all-tutors', tutor_controller_1.TutorController.getAllTutorsByUser);
router.get('/admin', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.ADMIN_TUTOR, user_1.ENUM_USER_ROLE.SUPER_ADMIN), tutor_controller_1.TutorController.getAllTutorsByAdmin);
router.get('/admin/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.TUTOR, // checking purpose
user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.ADMIN_TUTOR, user_1.ENUM_USER_ROLE.SUPER_ADMIN), tutor_controller_1.TutorController.getSingleTutorByAdmin);
router.patch('/accept-request/:userId', (0, auth_1.default)(user_1.ENUM_USER_ROLE.TUTOR), tutor_controller_1.TutorController.acceptBookingRequest);
router.delete('/cancel-request/:userId', (0, auth_1.default)(user_1.ENUM_USER_ROLE.TUTOR), tutor_controller_1.TutorController.cancelBookingRequest);
router.patch('/profile/:id', (0, validateRequest_1.default)(tutor_validation_1.TutorValidation.updateTutorZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.TUTOR, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN_TUTOR), tutor_controller_1.TutorController.updateProfile);
router.patch('/review/:id', (0, validateRequest_1.default)(tutor_validation_1.TutorValidation.reviewTutorZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN_TUTOR, user_1.ENUM_USER_ROLE.ADMIN_USER, user_1.ENUM_USER_ROLE.USER), tutor_controller_1.TutorController.reviewTutor);
exports.TutorRouters = router;
