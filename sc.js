function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId + '-page').classList.add('active');
    
    document.getElementById('nav-home').classList.toggle('active-link', pageId === 'home');
    document.getElementById('nav-chat').classList.toggle('active-link', pageId === 'chat');
}

function handleEnter(event) {
    if (event.key === "Enter") sendMessage();
}

function sendMessage() {
    const inputField = document.getElementById("user-input");
    const message = inputField.value.trim();
    if (message !== "") {
        processMessage(message);
        inputField.value = "";
    }
}

function processMessage(messageText) {
    const chatBox = document.getElementById("chat-box");
    const typingIndicator = document.getElementById("typing-indicator");

    addMessage(messageText, "user");
    typingIndicator.classList.remove("hidden");

    // จำลองการคิดวิเคราะห์ข้อมูล
    setTimeout(() => {
        typingIndicator.classList.add("hidden");
        const botReply = getAcademicResponse(messageText);
        addMessage(botReply, "bot");
    }, 1200);
}

function addMessage(text, sender) {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender === "user" ? "user-message" : "bot-message");

    const avatar = sender === "bot" ? '<div class="avatar"><i class="fas fa-robot"></i></div>' : '<div class="avatar"><i class="fas fa-user"></i></div>';
    const bubble = `<div class="bubble">${text}</div>`;
    
    messageDiv.innerHTML = sender === "bot" ? avatar + bubble : bubble + avatar;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// --- ระบบวิเคราะห์คำถามเชิงลึก (The Brain) ---
function getAcademicResponse(input) {
    const text = input.toLowerCase();

    // 1. หมวดคณิตศาสตร์/คำนวณ
    if (text.includes("บวก") || text.includes("คำนวณ") || text.includes("สูตร") || text.includes("เท่ากับ")) {
        return `<b>การวิเคราะห์เชิงตัวเลข:</b><br>
                ในการแก้ไขปัญหาทางคณิตศาสตร์ เราต้องเริ่มจากการ <u>จัดเรียงสมการ</u> และ <u>ทำตามลำดับความสำคัญ (PEMDAS)</u> <br>
                หากท่านระบุโจทย์ที่ชัดเจน ผมสามารถช่วยแสดงวิธีคิดทีละขั้นตอนได้ครับ`;
    }

    // 2. หมวดวิทยาศาสตร์
    if (text.includes("วิทย์") || text.includes("แรง") || text.includes("สาร") || text.includes("สิ่งมีชีวิต")) {
        return `<b>มุมมองทางวิทยาศาสตร์:</b><br>
                ตามทฤษฎีและประจักษ์พยานทางวิทยาศาสตร์ สิ่งที่คุณถามเกี่ยวข้องกับ <u>กระบวนการทางธรรมชาติ</u> <br>
                <b>หลักการสำคัญ:</b> การสังเกต, การตั้งสมมติฐาน และการทดลอง หากท่านต้องการเจาะลึกบทเรียนไหนเป็นพิเศษ แจ้งได้เลยครับ`;
    }

    // 3. หมวดภาษา/การสื่อสาร (ไทย-อังกฤษ)
    if (text.includes("แปล") || text.includes("ภาษา") || text.includes("เขียน") || text.includes("ความหมาย")) {
        return `<b>หลักการทางภาษาศาสตร์:</b><br>
                โครงสร้างของภาษาที่คุณสอบถามมา เน้นความเข้าใจเรื่อง <u>บริบท (Context)</u> และ <u>ไวยากรณ์ (Grammar)</u> <br>
                เพื่อให้สื่อสารได้ตรงจุด ควรคำนึงถึงระดับของภาษา (ทางการ/ไม่ทางการ) ด้วยครับ`;
    }

    // 4. หมวดการศึกษาและการใช้ AI (หัวข้อหลัก)
    if (text.includes("เรียน") || text.includes("สอน") || text.includes("ai") || text.includes("แชทบอท")) {
        return `<b>หลักการพัฒนาการเรียนการสอน (Edu-Innovation):</b><br>
                การใช้ AI ในห้องเรียนไม่ใช่แค่การหาคำตอบ แต่คือการสร้าง <u>Personalized Learning Path</u> <br>
                - <b>สำหรับผู้สอน:</b> ช่วยลดภาระงานเอกสารและสร้างสื่อการสอนที่หลากหลาย <br>
                - <b>สำหรับผู้เรียน:</b> เป็นเพื่อนคู่คิดที่ช่วยขยายขอบเขตการสืบค้นข้อมูลครับ`;
    }

    // 5. หมวดสุขภาพ/จิตวิทยาการเรียนรู้
    if (text.includes("เครียด") || text.includes("จำไม่ได้") || text.includes("สมาธิ")) {
        return `<b>มุมมองเชิงจิตวิทยาการศึกษา:</b><br>
                เทคนิคที่จะช่วยให้เรียนรู้ได้ดีขึ้นคือ <u>Spaced Repetition</u> (การทบทวนเป็นระยะ) และ <u>Active Recall</u> <br>
                หากรู้สึกเหนื่อยเกินไป การพักสมองสัก 5-10 นาที จะช่วยให้การประมวลผลข้อมูลในสมองทำงานได้ดีขึ้นครับ`;
    }

    // 6. หมวดทักทาย/ตัวตนของบอท
    if (text.includes("สวัสดี") || text.includes("สบายดีไหม") || text.includes("ใคร")) {
        return `สวัสดีครับ! ผมคือ <b>Academic AI Assistant</b> ผู้ช่วยอัจฉริยะที่ถูกออกแบบมาเพื่อยกระดับการเรียนการสอน <br>
                ท่านสามารถถามได้ทุกเรื่อง ไม่ว่าจะเป็นวิชาการ หรือการแนะแนวทางพัฒนาตนเองครับ`;
    }

    // 7. ระบบตอบกลับสำหรับ "ทุกคำถามที่เหลือ" (Intelligent Fallback)
    return `ข้อคำถามเกี่ยวกับ "<b>${input}</b>" นั้น <br><br>
            <b>หากมองในเชิงวิชาการ:</b> ประเด็นนี้สามารถวิเคราะห์ได้ผ่าน <u>กระบวนการคิดเชิงระบบ (Systematic Thinking)</u> <br>
            โดยแบ่งออกเป็น 3 ส่วนหลักคือ <br>
            1. ที่มาและสาเหตุ <br>
            2. ข้อมูลสนับสนุน <br>
            3. บทสรุปหรือการนำไปใช้ <br><br>
            ท่านอยากให้ผมลงลึกข้อมูลในส่วนไหนของหัวข้อนี้เป็นพิเศษไหมครับ? ผมพร้อมจะค้นคว้าและสรุปให้ท่านทันที`;
}

function clearChat() {
    document.getElementById("chat-box").innerHTML = `
        <div class="message bot-message">
            <div class="avatar"><i class="fas fa-robot"></i></div>
            <div class="bubble">ระบบพร้อมรับคำถามใหม่ในเชิงวิชาการแล้วครับ มีอะไรให้ผมช่วยไหม?</div>
        </div>`;
}
// --- ระบบวิเคราะห์คำถามอัจฉริยะ (Enhanced AI Brain) ---
function getAcademicResponse(input) {
    const text = input.toLowerCase();

    // 1. หมวดคณิตศาสตร์/วิทยาศาสตร์
    if (text.includes("บวก") || text.includes("คำนวณ") || text.includes("วิทย์") || text.includes("สูตร")) {
        return `<b>การวิเคราะห์เชิงวิชาการ:</b><br>
                โจทย์หรือคำถามเชิงตรรกะนี้ สามารถหาคำตอบได้โดยใช้ <u>กระบวนการทางวิทยาศาสตร์</u> หรือ <u>การจัดเรียงสมการ</u> <br>
                หากท่านมีตัวเลขหรือสมมติฐานที่เฉพาะเจาะจง ผมสามารถช่วยคำนวณทีละขั้นตอน (Step-by-Step) ได้ทันทีครับ`;
    }

    // 2. หมวดความรู้ทั่วไป/การใช้ชีวิต (ความรอบรู้)
    if (text.includes("คืออะไร") || text.includes("ประวัติ") || text.includes("ทำอย่างไร") || text.includes("แนะนำ")) {
        return `<b>ข้อมูลเชิงลึกและการแนะนำ:</b><br>
                เรื่องที่ท่านสอบถามมานั้น มีความสำคัญในแง่ของ <u>การแสวงหาความรู้รอบด้าน</u> <br>
                หลักการเบื้องต้นคือการเข้าใจบริบทและที่มา หากท่านต้องการให้สรุปเป็นข้อๆ หรือต้องการแนวทางปฏิบัติ แจ้งได้เลยครับ`;
    }

    // 3. หมวดภาษา/การแปล
    if (text.includes("แปล") || text.includes("ภาษา") || text.includes("เขียน")) {
        return `<b>การวิเคราะห์ทางภาษาศาสตร์:</b><br>
                โครงสร้างประโยคหรือคำศัพท์ที่ท่านสนใจ ต้องพิจารณาที่ <u>บริบท (Context)</u> เป็นสำคัญ <br>
                ผมสามารถช่วยตรวจสอบไวยากรณ์ หรือแนะนำคำศัพท์ที่เหมาะสมกับระดับภาษาที่ท่านต้องการใช้ได้ครับ`;
    }

    // 4. หมวดการศึกษาและการใช้ AI (Edu-Innovation)
    if (text.includes("เรียน") || text.includes("สอน") || text.includes("ai") || text.includes("แชทบอท")) {
        return `<b>หลักการพัฒนาการเรียนการสอน (Edu-Tech):</b><br>
                การบูรณาการ AI เข้ากับการเรียนรู้ ช่วยสร้าง <u>Personalized Learning</u> หรือการเรียนรู้เฉพาะบุคคล <br>
                - <b>สำหรับผู้สอน:</b> ช่วยออกแบบแผนการสอนที่น่าสนใจ <br>
                - <b>สำหรับผู้เรียน:</b> เป็นแหล่งข้อมูลและที่ปรึกษาได้ตลอด 24 ชั่วโมงครับ`;
    }

    // 5. ระบบตอบกลับสำหรับ "ทุกคำถามที่เหลือ" (Universal Fallback)
    return `ข้อคำถามเกี่ยวกับ "<b>${input}</b>" เป็นประเด็นที่น่าสนใจและสามารถวิเคราะห์ได้หลายมิติครับ <br><br>
            <b>ข้อมูลเบื้องต้น:</b> เรื่องนี้เกี่ยวข้องกับหลักการ <u>Thinking Process (กระบวนการคิด)</u> <br>
            1. ท่านต้องการให้ผมสรุปเนื้อหาสำคัญให้ฟังไหมครับ? <br>
            2. หรือต้องการให้ช่วยค้นคว้าความเชื่อมโยงกับหัวข้ออื่น? <br><br>
            ผมพร้อมจะสืบค้นและให้คำตอบที่แม่นยำที่สุดแก่ท่านครับ`;
}
