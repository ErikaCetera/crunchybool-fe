function App() {
    return (


        <Router>
            <AppAllert />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="/search" element={<SearchDoctors />} />
                    <Route path="doctor/:slug" element={<DoctorDetail />} />
                    <Route path="registration" element={<DoctorRegistration />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </Router>

    );
}

export default App;
