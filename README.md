# **Tutoring Service Booking and Management Website (Backend)**

### **Website Live Link: https://service-booking-and-management-frontend-mdminhazulislamkhan.vercel.app/home**

### **Frontend Github: https://github.com/MDMinhazulIslamKhan/service_booking_and_management_frontend**

### **Backend Live link: https://tutor-booking-and-management-mdminhazulislamkhan.vercel.app**

---

### **Requerment analysis - [_click here_](https://docs.google.com/document/d/1wmVlihhTgZ1x63fuUGuOHrgZYcqdmyRxRASa8SCU0q0/edit?usp=drive_link)**

### **ER Diagram - [_click here_](https://drive.google.com/file/d/1ILGApNdM7ph1Jx2R3JoIixK92901DQIf/view?usp=drive_link)**

---

## Used Technology

- TypeScript
- NodeJs
  - ExpressJs
- MongoDB
  - Mongoose
- Zod
- Jsonwebtoken
- Bcrypt
- Cors
- Cookie-parser
- Dotenv
- Http-status
- ESLint
- Lint-staged
- Husky

---

## Main Functionality

- All tutor with pagination and searching
- Tutor booking
  - Cancel booking
  - Confirm booking
- See details of tutor
- Add to cart
- User and Tutor different login and registration
- Tutor can cancel and accept order
- Admin different dashboard
- Admin can update all tutor and user profile
- Everyone can update his profile and change his password
- Role base activity

## ROLES

**USER**

- booking
- cancel booking
- confirm booking after accept

**ADMIN_USER**

- See all user
- See all tutor
- Update all user

**ADMIN_TUTOR**

- See all user
- See all tutor
- Update all tutor
- process booking

**ADMIN**

- See all user
- See all tutor
- Update all user
- Update all tutor
- process booking

**SUPER_ADMIN**

- All admin functionality
- Can change user role

## SUPER_ADMIN login info

- phoneNumber : minhaz@gmail.com

- password : 123456

```json
{
  "email": "minhaz@gmail.com",
  "password": "123456"
}
```

## API Endpoints

### User routes

- /user/signup (post)
- /user/login (post)
- /user/refresh-token (post)
- /user/profile (get) ⇒ (for getting own profile)
- /user/profile (patch) ⇒ (for updating own profile)
- /user/get-all-users (get) ⇒ (for admin_user, admin_tutor, admin, super_admin)
- /user/single-user/:id (get) ⇒ (for getting own profile or all admins)
- /user/profile/:id (patch) ⇒ (for updating by admin_user, admin, super_admin)
- /user/change-password (patch) ⇒ (for updating own password)
- /user/change-role/:id (patch) ⇒ (for changing user role by super_admin)

### Tutor routes

- /tutor/signup (post)
- /tutor/login (post)
- /tutor/change-password (patch) ⇒ (for updating own password)
- /tutor/profile (get) ⇒ (for getting own profile)
- /tutor/single-tutor/:id (get) (for getting single tutor by everyone)
- /tutor/all-tutor (get) ⇒ (for getting all tutors by everyone)
- /tutor/admin (get) ⇒ (for getting all tutors by admin_user, admin_tutor, admin, super_admin)
- /tutor/admin/:id (get) ⇒ (for getting single tutors by admin_tutor, admin, super_admin)
- /tutor/accept-request/:userId (patch) ⇒ (for accept own tuition booking request)
- /tutor/cancel-request/:userId (delete) ⇒ (for disapproved own tuition request)
- /tutor/profile/:id (patch) ⇒ (for updating own profile or updating by admin_tutor, admin, super_admin)
- /tutor/review/:id (post) ⇒ (for review tutor by any user)

### Booking routes

- /booking (post) ⇒ (for booking tutor by any user)
- /booking/get-my-bookings (get) ⇒ (for get own bookings by any user)
- /booking/all-booking (get) ⇒ (for get all bookings by admin_user, admin_tutor, admin, super_admin)
- /booking/requested-booking (get) ⇒ (for get all requested bookings by admin_tutor, admin, super_admin)
- /booking/process/:bookingId (patch) ⇒ (for process booking by admin_tutor, admin, super_admin)
- /booking/cancel-by-admin/:bookingId (delete) ⇒ (for disapproved booking by admin_tutor, admin, super_admin)
- /booking/cancel/:bookingId (delete) ⇒ (for cancel own booking for tutor)
- /booking/confirm/:bookingId (patch) ⇒ (for confirm own booking for tutor)

### Feedback routes

- /feedback (get)
- /feedback (post) ⇒ (for all user and tutor)
