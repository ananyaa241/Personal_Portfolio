function Footer(){

    return(

        <footer className='bg-slate-950 text-white py-20'>

            <div className='max-w-7xl mx-auto px-8 grid md:grid-cols-4 gap-12'>

                <div>

                    <h1 className='text-4xl font-black text-cyan-400'>

                        MediCare+

                    </h1>

                    <p className='mt-6 text-slate-400 leading-relaxed'>

                        Premium healthcare management
                        system for modern hospitals
                        and patients.

                    </p>

                </div>

                <div>

                    <h2 className='text-2xl font-bold'>

                        Services

                    </h2>

                    <ul className='mt-6 space-y-4 text-slate-400'>

                        <li>Appointments</li>

                        <li>Emergency Care</li>

                        <li>Prescriptions</li>

                        <li>Medical Records</li>

                    </ul>

                </div>

                <div>

                    <h2 className='text-2xl font-bold'>

                        Quick Links

                    </h2>

                    <ul className='mt-6 space-y-4 text-slate-400'>

                        <li>Doctors</li>

                        <li>Patients</li>

                        <li>Dashboard</li>

                        <li>Contact</li>

                    </ul>

                </div>

                <div>

                    <h2 className='text-2xl font-bold'>

                        Contact

                    </h2>

                    <ul className='mt-6 space-y-4 text-slate-400'>

                        <li>Hyderabad, India</li>

                        <li>040-68334470</li>

                        <li>support@medicare.com</li>

                    </ul>

                </div>

            </div>

            <div className='border-t border-slate-800 mt-16 pt-8 text-center text-slate-500'>

                © 2026 MediCare+ Hospitals.
                All rights reserved.

            </div>

        </footer>
    )
}

export default Footer