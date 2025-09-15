# Modernize Admin Page to Dashboard UI - TODO

## Step 1: Create Layout Components
- [x] Create DashboardLayout.js with sidebar and header layout
- [x] Create Sidebar.js with navigation menu items
- [x] Create Header.js with search bar, notifications, user profile dropdown

## Step 2: Create Product Modal Component
- [x] Create ProductModal.js for add/edit product forms with validation

## Step 3: Update Main Admin Page (form.js)
- [ ] Refactor form.js to use DashboardLayout
- [ ] Replace product cards with Bootstrap table showing product details
- [ ] Add search input to filter products by name/description
- [ ] Integrate pagination component for product list navigation
- [ ] Add "Add New" button to open ProductModal for adding product
- [ ] Add Edit button in table rows to open ProductModal pre-filled for editing
- [ ] Add Delete button with confirmation dialog
- [ ] Use toast notifications for success/error feedback
- [ ] Move logout button to header or sidebar

## Step 4: Styling
- [x] Create dashboard.css for dashboard-specific styles
- [ ] Remove or refactor old form styles as needed

## Step 5: Testing
- [ ] Test all CRUD operations (add, edit, delete)
- [ ] Test search and pagination functionality
- [ ] Test responsiveness and UI consistency
- [ ] Test logout functionality
