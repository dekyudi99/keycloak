/* eslint-disable @typescript-eslint/no-unused-vars */
import { i18nBuilder } from "keycloakify/login";
import type { ThemeName } from "../kc.gen";

/** @see: https://docs.keycloakify.dev/features/i18n */
const { useI18n, ofTypeI18n } = i18nBuilder
    .withThemeName<ThemeName>()
    .withExtraLanguages({
        id: {
            label: "Bahasa Indonesia",
            getMessages: () => import("./i18n/id")
        }
    })
    .withCustomTranslations({
        en: {
            wefgisTitle: "WEFGIS",
            wefgisSubtitle: "Spatial Platform Single Sign-On",
            loginCardTitle: "Sign In",
            loginCardSubtitle: "Enter your credentials to access the platform",
            registerCardTitle: "Create Account",
            registerCardSubtitle: "Register a new account to access the platform",
            orDivider: "or continue with",
            signInWithGoogle: "Sign in with Google",
            noAccountYet: "Don't have an account?",
            alreadyHaveAccount: "Already have an account?",
            registerLink: "Sign up",
            loginLink: "Sign in",
            usernameOrEmailLabel: "Username or email",
            passwordLabel: "Password",
            confirmPasswordLabel: "Confirm password",
            firstNameLabel: "First name",
            lastNameLabel: "Last name",
            emailLabel: "Email address",
            rememberMeLabel: "Remember me",
            forgotPasswordLabel: "Forgot password?",
            submitLogin: "Sign In",
            submitRegister: "Create Account",
            fieldRequired: "This field is required",
            passwordMismatch: "Passwords do not match",
            toggleTheme: "Toggle theme",
            language: "Language",
            copyrightText: "© 2026 WEFGIS Spatial Platform. All rights reserved.",
            ourVisionTitle: "Our Vision",
            ourVisionContent: "To foster a sustainable international collaboration that encourages cross-disciplinary innovation and advances knowledge, with the aim of developing excellent human resources and contributing meaningfully to the global community.",
            ourMissionTitle: "Our Mission",
            ourMissionContent: "To generate academic and technological breakthroughs, provide meaningful experiences for students and lecturers, and deliver real benefits to society. From joint publications and academic events to research engaging local governments, this collaboration continues to grow as an inclusive platform for fresh ideas.",
            aboutUsTitle: "About Us",
            aboutUsContent: "The collaboration between KGEO, KMUTT (Thailand) and Universitas Pendidikan Ganesha (Indonesia) was founded on a shared vision to create an open space for learning, research, and innovation. With an MoU already established and a MoA to be signed in 2025, this partnership stands as an international bridge focused on computer science, software engineering, geospatial technology, and digital innovation.",
            aboutUsClosing: "We warmly welcome students, researchers, and partners to join us, because innovation knows no boundaries, and collaboration makes it possible.",
            collaboratorsTitle: "Collaborators",
            integratedAppsTitle: "Integrated Applications"
        },
        id: {
            wefgisTitle: "WEFGIS",
            wefgisSubtitle: "Single Sign-On Platform Spasial",
            loginCardTitle: "Masuk",
            loginCardSubtitle: "Masukkan kredensial untuk mengakses platform",
            registerCardTitle: "Daftar Akun",
            registerCardSubtitle: "Daftarkan akun baru untuk mengakses platform",
            orDivider: "atau masuk dengan",
            signInWithGoogle: "Masuk dengan Google",
            noAccountYet: "Belum memiliki akun?",
            alreadyHaveAccount: "Sudah memiliki akun?",
            registerLink: "Daftar sekarang",
            loginLink: "Masuk",
            usernameOrEmailLabel: "Nama pengguna atau email",
            passwordLabel: "Kata sandi",
            confirmPasswordLabel: "Konfirmasi kata sandi",
            firstNameLabel: "Nama depan",
            lastNameLabel: "Nama belakang",
            emailLabel: "Alamat email",
            rememberMeLabel: "Ingat saya",
            forgotPasswordLabel: "Lupa kata sandi?",
            submitLogin: "Masuk",
            submitRegister: "Daftar Akun",
            fieldRequired: "Field ini wajib diisi",
            passwordMismatch: "Kata sandi tidak cocok",
            toggleTheme: "Ganti tema",
            language: "Bahasa",
            copyrightText: "© 2026 WEFGIS Spatial Platform. Seluruh hak cipta dilindungi.",
            ourVisionTitle: "Visi Kami",
            ourVisionContent: "Mendorong kolaborasi internasional yang berkelanjutan yang memacu inovasi lintas disiplin dan memajukan ilmu pengetahuan, dengan tujuan mengembangkan sumber daya manusia yang unggul dan berkontribusi secara nyata bagi masyarakat global.",
            ourMissionTitle: "Misi Kami",
            ourMissionContent: "Menghasilkan terobosan akademik dan teknologi, memberikan pengalaman bermakna bagi mahasiswa dan dosen, serta memberikan manfaat nyata bagi masyarakat. Dari publikasi bersama dan kegiatan akademik hingga riset bersama pemerintah daerah, kolaborasi ini terus tumbuh sebagai platform inklusif untuk ide-ide baru.",
            aboutUsTitle: "Tentang Kami",
            aboutUsContent: "Kolaborasi antara KGEO, KMUTT (Thailand), dan Universitas Pendidikan Ganesha (Indonesia) didasarkan pada visi bersama untuk menciptakan ruang terbuka bagi pembelajaran, penelitian, dan inovasi. Dengan MoU yang telah terjalin dan MoA yang akan ditandatangani pada tahun 2025, kemitraan ini berdiri sebagai jembatan internasional yang berfokus pada ilmu komputer, rekayasa perangkat lunak, teknologi geospasial, dan inovasi digital.",
            aboutUsClosing: "Kami menyambut hangat mahasiswa, peneliti, dan mitra untuk bergabung bersama kami, karena inovasi tidak mengenal batas, dan kolaborasi menjadikannya nyata.",
            collaboratorsTitle: "Kolaborator",
            integratedAppsTitle: "Aplikasi Terintegrasi"
        },
        th: {
            wefgisTitle: "WEFGIS",
            wefgisSubtitle: "แพลตฟอร์มเชิงพื้นที่ ลงชื่อเข้าใช้ครั้งเดียว",
            loginCardTitle: "ลงชื่อเข้าใช้",
            loginCardSubtitle: "ป้อนข้อมูลประจำตัวของคุณเพื่อเข้าสู่ระบบ",
            registerCardTitle: "สร้างบัญชีใหม่",
            registerCardSubtitle: "ลงทะเบียนบัญชีใหม่เพื่อเข้าสู่ระบบแพลตฟอร์ม",
            orDivider: "หรือดำเนินการต่อด้วย",
            signInWithGoogle: "ลงชื่อเข้าใช้ด้วย Google",
            noAccountYet: "ยังไม่มีบัญชีใช่หรือไม่?",
            alreadyHaveAccount: "มีบัญชีอยู่แล้วใช่หรือไม่?",
            registerLink: "ลงทะเบียน",
            loginLink: "ลงชื่อเข้าใช้",
            usernameOrEmailLabel: "ชื่อผู้ใช้หรืออีเมล",
            passwordLabel: "รหัสผ่าน",
            confirmPasswordLabel: "ยืนยันรหัสผ่าน",
            firstNameLabel: "ชื่อจริง",
            lastNameLabel: "นามสกุล",
            emailLabel: "ที่อยู่อีเมล",
            rememberMeLabel: "จดจำฉันไว้",
            forgotPasswordLabel: "ลืมรหัสผ่าน?",
            submitLogin: "ลงชื่อเข้าใช้",
            submitRegister: "สร้างบัญชี",
            fieldRequired: "จำเป็นต้องกรอกข้อมูลในช่องนี้",
            passwordMismatch: "รหัสผ่านไม่ตรงกัน",
            toggleTheme: "สลับธีม",
            language: "ภาษา",
            copyrightText: "© 2026 WEFGIS Spatial Platform. สงวนลิขสิทธิ์.",
            ourVisionTitle: "วิสัยทัศน์ของเรา",
            ourVisionContent: "เพื่อส่งเสริมความร่วมมือระหว่างประเทศที่ยั่งยืน ซึ่งกระตุ้นนวัตกรรมข้ามศาสตร์และพัฒนาความรู้ โดยมีเป้าหมายเพื่อพัฒนาทรัพยากรมนุษย์ที่มีคุณภาพและสร้างประโยชน์ต่อชุมชนระดับโลกอย่างแท้จริง",
            ourMissionTitle: "พันธกิจของเรา",
            ourMissionContent: "เพื่อสร้างความก้าวหน้าทางวิชาการและเทคโนโลยี มอบประสบการณ์ที่มีคุณค่าแก่นักศึกษาและอาจารย์ และส่งมอบประโยชน์ที่เป็นรูปธรรมแก่สังคม ตั้งแต่การตีพิมพ์ผลงานร่วมกัน การจัดกิจกรรมทางวิชาการ ไปจนถึงการวิจัยร่วมกับองค์กรปกครองส่วนท้องถิ่น ความร่วมมือนี้ยังคงเติบโตอย่างต่อเนื่องเพื่อเป็นแพลตฟอร์มสำหรับความคิดสร้างสรรค์ใหม่ๆ",
            aboutUsTitle: "เกี่ยวกับเรา",
            aboutUsContent: "ความร่วมมือระหว่าง KGEO, KMUTT (ประเทศไทย) และ มหาวิทยาลัยการศึกษา Ganesha (อินโดนีเซีย) ก่อตั้งขึ้นจากวิสัยทัศน์ร่วมกันในการสร้างพื้นที่เปิดสำหรับการเรียนรู้ การวิจัย และนวัตกรรม ด้วยบันทึกข้อตกลง (MoU) ที่ได้จัดทำขึ้นแล้ว และ MoA ที่จะลงนามในปี 2025 ความร่วมมือนี้จึงเปรียบเสมือนสะพานเชื่อมระหว่างประเทศที่มุ่งเน้นด้านวิทยาการคอมพิวเตอร์ วิศวกรรมซอฟต์แวร์ เทคโนโลยีเชิงพื้นที่ และนวัตกรรมดิจิทัล",
            aboutUsClosing: "เรายินดีต้อนรับนักศึกษา นักวิจัย และพันธมิตรทุกท่านอย่างอบอุ่น เพราะนวัตกรรมไม่มีพรมแดน และความร่วมมือทำให้สิ่งเหล่านี้เป็นไปได้",
            collaboratorsTitle: "ผู้ร่วมมือ",
            integratedAppsTitle: "แอปพลิเคชันที่เชื่อมโยง"
        }
    })
    .build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
