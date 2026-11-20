const FRAMEWORKS_META = {
    A: { code: "A", name: "Cause + Solution", vi: "Nguyên nhân & Giải pháp" },
    B: { code: "B", name: "Two-Part Question", vi: "Câu hỏi 2 vế (Mỗi vế 1 đoạn)" },
    C: { code: "C", name: "Agree / Disagree", vi: "Đồng ý / Không đồng ý" },
    D: { code: "D", name: "Discuss Both Views + Opinion", vi: "Thảo luận 2 quan điểm + Ý kiến" },
    E: { code: "E", name: "Advantages vs. Disadvantages", vi: "Ưu – Nhược điểm (Outweigh)" }
};

const QUESTIONS_DATA = [
    {
        id: 1,
        code: "Q1",
        title: "Q1 - Culinary Traditions",
        framework: "A",
        frameworkName: "Cause + Solution",
        minWords: 350,
        maxWords: 400,
        content: `Writing topic\n\nThe growing presence of Western fast food chains has changed local eating habits and culinary traditions. Nevertheless, measures can be taken to counter this impact and encourage the preservation of traditional diets.\n\nWrite an essay (350–400 words) explaining the causes behind the spread of Western fast food and suggesting solutions that help preserve and promote local culinary traditions.`,
        quickHints: {
            stance: "Thân 1: Nguyên nhân (tiện lợi + quảng cáo) • Thân 2: Giải pháp (giáo dục + chính phủ)",
            vocab: [
                "convenience and affordability (tiện lợi & giá rẻ)",
                "aggressive marketing (quảng cáo rầm rộ)",
                "nutritional value (giá trị dinh dưỡng)",
                "traditional cuisine (ẩm thực truyền thống)",
                "restore pride (khôi phục niềm tự hào)"
            ],
            body1Vi: [
                "Point 1: Tiện lợi và giá rẻ (bận rộn, mua burger vài phút vs nấu món truyền thống mất hàng giờ).",
                "Point 2: Toàn cầu hóa và quảng cáo rầm rộ gắn đồ ăn nhanh với lối sống hiện đại, thu hút giới trẻ."
            ],
            body2Vi: [
                "Point 1: Giáo dục (trường học tổ chức lớp nấu ăn, bữa trưa học đường dùng nguyên liệu truyền thống ở Nhật).",
                "Point 2: Chính phủ & truyền thông hỗ trợ quán ăn gia đình và tổ chức lễ hội ẩm thực."
            ]
        },
        stage2Intro: {
            template: "In recent years, Western fast food chains have become increasingly {{1}}, {{2}} the way local people eat. This essay will examine the main {{3}} of this trend and propose practical {{4}} to preserve traditional cuisine.",
            answers: ["common", "reshaping", "causes", "solutions"],
            distractors: ["rare", "destroying", "benefits"],
            viTranslation: "Dạo gần đây, các chuỗi đồ ăn nhanh phương Tây ngày càng phổ biến, định hình lại cách người dân địa phương ăn uống. Bài viết sẽ phân tích nguyên nhân chính của xu hướng này và đề xuất giải pháp thực tế để bảo tồn ẩm thực truyền thống."
        },
        stage3Body1: [
            { role: "Point 1", en: "One major reason is the convenience and affordability of fast food.", vi: "Một nguyên nhân chính là sự tiện lợi và giá cả phải chăng của đồ ăn nhanh." },
            { role: "Explain 1", en: "With busy schedules, many people prefer meals that are quick, cheap, and available everywhere.", vi: "Với lịch trình bận rộn, nhiều người thích bữa ăn nhanh, rẻ và có mặt khắp nơi." },
            { role: "Example", en: "For instance, students and office workers can grab a burger within minutes, whereas cooking a traditional dish takes hours.", vi: "Ví dụ, sinh viên và dân văn phòng mua burger trong vài phút, còn nấu món truyền thống mất hàng giờ." },
            { role: "Point 2", en: "Another cause is globalisation and aggressive marketing.", vi: "Một nguyên nhân khác là toàn cầu hóa và quảng cáo rầm rộ." },
            { role: "Link", en: "As a result, traditional food is increasingly seen as old-fashioned.", vi: "Kết quả là món ăn truyền thống ngày càng bị coi là lỗi thời." }
        ],
        stage4Body2: [
            { role: "Point 1", vi: "Giáo dục là giải pháp thiết thực đầu tiên.", keywords: ["Education", "practical solution"], sample: "Education is the first practical solution." },
            { role: "Explain 1", vi: "Trường học có thể tổ chức lớp nấu ăn và dạy trẻ về giá trị văn hóa cũng như dinh dưỡng của món địa phương.", keywords: ["cooking classes", "cultural", "nutritional value"], sample: "Schools could organise cooking classes and teach children the cultural and nutritional value of local dishes." },
            { role: "Point 2", vi: "Ngoài ra, chính phủ và truyền thông nên tích cực quảng bá ẩm thực địa phương.", keywords: ["In addition", "governments", "actively promote"], sample: "In addition, governments and the media should actively promote local food." },
            { role: "Link", vi: "Các biện pháp này có thể giúp khôi phục niềm tự hào về ẩm thực địa phương.", keywords: ["These measures", "restore pride", "local cuisine"], sample: "These measures could help restore pride in local cuisine." }
        ],
        sampleConclusion: {
            en: "In conclusion, the spread of fast food is driven mainly by convenience and global marketing. However, through education and government support, traditional diets can be preserved for future generations.",
            vi: "Tóm lại, sự lan rộng của đồ ăn nhanh chủ yếu do tiện lợi và quảng cáo toàn cầu. Tuy nhiên, nhờ giáo dục và hỗ trợ từ chính phủ, ẩm thực truyền thống có thể được giữ gìn cho thế hệ sau."
        }
    },
    {
        id: 2,
        code: "Q2",
        title: "Q2 - University Rankings",
        framework: "B",
        frameworkName: "Two-Part Question",
        minWords: 350,
        maxWords: 400,
        content: `Writing topic\n\nUniversity rankings frequently influence where students choose to apply and enroll. However, they may not always be the best indicator of academic quality.\n\nWrite an essay (350-400 words) discussing how university rankings affect students' application and enrollment choices, and whether they can be considered a reliable measure of academic quality.`,
        quickHints: {
            stance: "Thân 1: Ảnh hưởng chọn trường • Thân 2: Không hoàn toàn đáng tin để đo chất lượng",
            vocab: [
                "widely consulted (được tham khảo rộng rãi)",
                "career prospects (triển vọng nghề nghiệp)",
                "research output (sản lượng nghiên cứu)",
                "student satisfaction (sự hài lòng của sinh viên)",
                "reliable measure (thước đo đáng tin cậy)"
            ],
            body1Vi: [
                "Point: Xếp hạng ảnh hưởng mạnh đến cả nộp hồ sơ lẫn nhập học (kỳ vọng giảng dạy tốt, cơ sở vật chất, cơ hội việc làm).",
                "Ví dụ: Nhiều du học sinh chỉ nộp vào top 100; phụ huynh và nhà tuyển dụng cũng coi trọng trường hạng cao."
            ],
            body2Vi: [
                "Point: Không hoàn toàn đáng tin vì quá thiên về sản lượng nghiên cứu và danh tiếng, ít đo chất lượng dạy học.",
                "Explain: Sinh viên đại học hiếm khi gặp giáo sư đầu ngành; xếp hạng chung bỏ qua thế mạnh từng chuyên ngành."
            ]
        },
        stage2Intro: {
            template: "University rankings have become a {{1}} source for students choosing where to {{2}}. This essay will discuss how rankings {{3}} students' decisions and whether they are a {{4}} indicator of academic quality.",
            answers: ["widely consulted", "study", "shape", "reliable"],
            distractors: ["hidden", "ignore", "useless"],
            viTranslation: "Bảng xếp hạng đại học đã trở thành nguồn tham khảo phổ biến cho sinh viên khi chọn nơi học. Bài viết sẽ thảo luận cách xếp hạng định hình quyết định của sinh viên và liệu chúng có phải thước đo đáng tin cậy về chất lượng học thuật hay không."
        },
        stage3Body1: [
            { role: "Point", en: "Rankings strongly influence both application and enrollment decisions.", vi: "Bảng xếp hạng ảnh hưởng mạnh đến cả quyết định nộp hồ sơ lẫn nhập học." },
            { role: "Explain 1", en: "Students often assume that a high-ranked university offers better teaching, modern facilities, and stronger career prospects.", vi: "Sinh viên thường cho rằng trường xếp hạng cao có giảng dạy tốt hơn, cơ sở vật chất hiện đại và triển vọng nghề nghiệp mạnh hơn." },
            { role: "Example", en: "For example, many international students only apply to universities in the global top 100.", vi: "Ví dụ, nhiều du học sinh chỉ nộp đơn vào các trường thuộc top 100 thế giới." },
            { role: "Explain 2", en: "Parents and employers also respect highly ranked institutions, which increases the pressure to choose them.", vi: "Phụ huynh và nhà tuyển dụng cũng coi trọng các trường hạng cao, làm tăng áp lực phải chọn chúng." },
            { role: "Link", en: "Therefore, rankings act as a quick shortcut when comparing hundreds of options.", vi: "Vì vậy, bảng xếp hạng đóng vai trò như một lối tắt nhanh khi so sánh hàng trăm lựa chọn." }
        ],
        stage4Body2: [
            { role: "Point", vi: "Tuy nhiên, xếp hạng không phải là thước đo hoàn toàn đáng tin cậy về chất lượng học thuật.", keywords: ["However", "reliable measure", "academic quality"], sample: "However, rankings are not a fully reliable measure of academic quality." },
            { role: "Explain 1", vi: "Nhiều hệ thống xếp hạng tập trung quá nhiều vào nghiên cứu và danh tiếng, trong khi chất lượng giảng dạy ít được chú ý.", keywords: ["research output", "reputation", "teaching quality"], sample: "Many ranking systems focus heavily on research output and reputation, while teaching quality and student satisfaction receive less attention." },
            { role: "Explain 2", vi: "Hơn nữa, xếp hạng tổng thể thường bỏ qua thế mạnh ở từng ngành học cụ thể.", keywords: ["Moreover", "overlook", "specific majors"], sample: "Moreover, overall rankings often overlook strength in specific majors." },
            { role: "Link", vi: "Do đó, bảng xếp hạng chỉ nên được xem là một yếu tố trong số nhiều yếu tố.", keywords: ["Thus", "only one factor"], sample: "Thus, rankings should be treated as only one factor among many." }
        ],
        sampleConclusion: {
            en: "In conclusion, although rankings significantly affect students' choices, they do not fully reflect academic quality. Students should also consider their chosen major, teaching style, and personal needs.",
            vi: "Tóm lại, dù xếp hạng ảnh hưởng lớn đến lựa chọn của sinh viên, chúng không phản ánh đầy đủ chất lượng học thuật. Sinh viên nên cân nhắc thêm ngành học, phong cách giảng dạy và nhu cầu cá nhân."
        }
    },
    {
        id: 3,
        code: "Q3",
        title: "Q3 - Internet Technology",
        framework: "C",
        frameworkName: "Agree / Disagree",
        minWords: 450,
        maxWords: 500,
        content: `WRITING QUESTION\n\nTime: 60 minutes\n\nWrite a 450-500 word essay responding to the question below:\n\nThe advancement of Internet technology means people do not need to travel to foreign countries to understand how people in other places live.\n\nTo what extent do you agree or disagree?`,
        quickHints: {
            stance: "Khuyên chọn: Partly agree / Mostly disagree (Internet là bước khởi đầu tốt nhưng không thay thế trải nghiệm thật)",
            vocab: [
                "first-hand experience (trải nghiệm trực tiếp)",
                "authentic (chân thực)",
                "create stereotypes (tạo ra định kiến)",
                "direct immersion (hòa mình trực tiếp)",
                "passive observer (người quan sát thụ động)"
            ],
            body1Vi: [
                "Internet cho phép tiếp cận tức thì và tiết kiệm tới văn hóa toàn cầu qua vlog, phim tài liệu, mạng xã hội (VD: tour ẩm thực đường phố Tokyo, Paris)."
            ],
            body2Vi: [
                "Nội dung mạng thường chỉnh sửa/dàn dựng gây định kiến; hiểu văn hóa thật cần cả 5 giác quan và giao lưu trực tiếp với người dân bản địa."
            ]
        },
        stage2Intro: {
            template: "It is argued that thanks to the {{1}}, individuals no longer need to {{2}} abroad to learn about foreign lifestyles and cultures. I {{3}} with this view, as online platforms offer valuable {{4}}, yet they cannot fully replace first-hand experience.",
            answers: ["Internet", "travel", "partly agree", "information"],
            distractors: ["television", "study", "completely ignore"],
            viTranslation: "Có ý kiến cho rằng nhờ có Internet, mọi người không còn cần đi du lịch nước ngoài để hiểu về lối sống và văn hóa nước khác. Tôi đồng ý một phần với quan điểm này, vì các nền tảng trực tuyến cung cấp thông tin giá trị, nhưng không thể thay thế hoàn toàn trải nghiệm trực tiếp."
        },
        stage3Body1: [
            { role: "Point", en: "On the one hand, the Internet provides instant and affordable access to global cultures.", vi: "Một mặt, Internet cung cấp quyền tiếp cận tức thì và tiết kiệm tới các nền văn hóa toàn cầu." },
            { role: "Explain", en: "Through travel vlogs, documentaries, and social media, anyone can observe daily routines, festivals, and traditions from every corner of the world without buying a plane ticket.", vi: "Qua vlog du lịch, phim tài liệu và mạng xã hội, bất kỳ ai cũng có thể quan sát sinh hoạt, lễ hội và truyền thống khắp nơi mà không cần mua vé máy bay." },
            { role: "Example", en: "For instance, YouTube creators often film authentic street food tours and home life in Tokyo or Paris in vivid detail.", vi: "Ví dụ, các nhà sáng tạo YouTube thường quay ẩm thực đường phố và đời sống gia đình ở Tokyo hay Paris cực kỳ sinh động." },
            { role: "Link", en: "Therefore, digital technology is undeniably a powerful starting point for cultural learning.", vi: "Vì vậy, công nghệ số chắc chắn là điểm khởi đầu mạnh mẽ để tìm hiểu văn hóa." }
        ],
        stage4Body2: [
            { role: "Point", vi: "Tuy nhiên, nội dung trực tuyến không bao giờ mang lại chiều sâu và sự chân thực của việc đi thực tế.", keywords: ["However", "authenticity", "real-life travel"], sample: "However, online content can never deliver the depth and authenticity of real-life travel." },
            { role: "Explain 1", vi: "Video và ảnh trên mạng thường bị chỉnh sửa hoặc dàn dựng để hút lượt xem, dễ tạo định kiến thay vì hiểu biết thật.", keywords: ["edited", "staged", "stereotypes"], sample: "First, videos and photos on the Internet are frequently edited, filtered, or staged to attract views, which can create stereotypes rather than true understanding." },
            { role: "Explain 2", vi: "Hiểu cách người khác sống cần cả năm giác quan: nếm hương vị bản địa, cảm nhận thời tiết và kết bạn thật với người địa phương.", keywords: ["five senses", "local flavours", "friendships"], sample: "Second, understanding how people live involves all five senses—tasting local flavours, feeling the weather, hearing everyday conversations, and building genuine friendships with locals." },
            { role: "Link", vi: "Do đó, sự hòa mình trực tiếp vẫn không thể thay thế để có hiểu biết văn hóa đích thực.", keywords: ["Consequently", "direct immersion", "irreplaceable"], sample: "Consequently, direct immersion remains irreplaceable for true cultural insight." }
        ],
        sampleConclusion: {
            en: "In conclusion, although the Internet makes learning about foreign lifestyles easier than ever, it cannot completely replace travelling abroad. Online resources should serve as preparation, while real travel provides genuine understanding.",
            vi: "Tóm lại, dù Internet giúp tìm hiểu lối sống nước ngoài dễ hơn bao giờ hết, nó không thể thay thế hoàn toàn việc du lịch. Nguồn trực tuyến nên là bước chuẩn bị, còn đi thực tế mới mang lại hiểu biết thật sự."
        }
    },
    {
        id: 4,
        code: "Q4",
        title: "Q4 - Career vs Education",
        framework: "D",
        frameworkName: "Discuss Both Views + Opinion",
        minWords: 450,
        maxWords: 500,
        content: `Time: 60 minutes\n\nWrite an essay of 450-500 words in response to the question below:\n\nSome people think that a university degree leads to better job opportunities and higher income, others think that getting a job right after high school leads to quicker financial independence.\n\nDiscuss both views and give your opinion.`,
        quickHints: {
            stance: "Khuyên chọn: Bằng đại học lợi thế dài hạn hơn, nhưng nên kết hợp thực tập lấy kinh nghiệm",
            vocab: [
                "lifetime earnings (thu nhập trọn đời)",
                "formal qualifications (bằng cấp chính quy)",
                "tuition fees (học phí)",
                "hands-on work experience (kinh nghiệm thực chiến)",
                "financial independence (độc lập tài chính)"
            ],
            body1Vi: [
                "View 1 (Đại học): Mở cơ hội nghề lương cao (bác sĩ, kỹ sư, luật sư), kiến thức chuyên sâu và mạng lưới quan hệ giúp thăng tiến."
            ],
            body2Vi: [
                "View 2 (Đi làm sớm): Tránh nợ học phí, có lương và học quản lý tiền sớm, 4 năm kinh nghiệm thực tế đôi khi ấn tượng hơn lý thuyết."
            ]
        },
        stage2Intro: {
            template: "People hold different opinions about whether pursuing a {{1}} or {{2}} immediately after high school is the wiser choice. This essay will discuss {{3}} before explaining why I believe higher education offers greater {{4}} advantages.",
            answers: ["university degree", "working", "both views", "long-term"],
            distractors: ["hobby", "retiring", "short-lived"],
            viTranslation: "Mọi người có ý kiến khác nhau về việc theo đuổi bằng đại học hay đi làm ngay sau cấp ba là lựa chọn khôn ngoan hơn. Bài viết sẽ thảo luận cả hai quan điểm trước khi giải thích vì sao tôi tin giáo dục đại học mang lại lợi thế dài hạn lớn hơn."
        },
        stage3Body1: [
            { role: "Point", en: "Those who support going to university argue that a degree opens doors to prestigious careers and higher lifetime earnings.", vi: "Những người ủng hộ học đại học cho rằng tấm bằng mở ra cánh cửa tới các nghề nghiệp danh giá và thu nhập trọn đời cao hơn." },
            { role: "Explain", en: "Many high-paying professions require specialised academic knowledge, formal qualifications, and critical thinking skills that are systematically taught at university.", vi: "Nhiều nghề lương cao đòi hỏi kiến thức chuyên sâu, bằng cấp chính quy và tư duy phản biện được đào tạo bài bản ở đại học." },
            { role: "Example", en: "For instance, becoming a doctor, software engineer, or corporate lawyer is virtually impossible without completing university education.", vi: "Ví dụ, trở thành bác sĩ, kỹ sư phần mềm hay luật sư doanh nghiệp gần như bất khả thi nếu không tốt nghiệp đại học." },
            { role: "Explain 2", en: "Moreover, university campuses help students build professional networks and soft skills that accelerate promotions later in life.", vi: "Hơn nữa, môi trường đại học giúp sinh viên xây dựng mạng lưới quan hệ và kỹ năng mềm giúp thăng tiến nhanh hơn sau này." },
            { role: "Link", en: "Therefore, a degree remains a strong investment for long-term career stability.", vi: "Vì vậy, bằng đại học vẫn là khoản đầu tư vững chắc cho sự ổn định nghề nghiệp dài hạn." }
        ],
        stage4Body2: [
            { role: "Point", vi: "Mặt khác, nhiều người tin rằng đi làm ngay mang lại độc lập tài chính nhanh hơn và kinh nghiệm thực tế.", keywords: ["On the other hand", "financial independence", "practical experience"], sample: "On the other hand, others believe that entering the workforce immediately brings faster financial independence and practical experience." },
            { role: "Explain 1", vi: "Thay vì đóng học phí đắt đỏ và gánh nợ suốt 4 năm, người trẻ đi làm kiếm lương ngay và học quản lý tiền sớm.", keywords: ["tuition fees", "student debt", "manage money"], sample: "Instead of paying expensive tuition fees and accumulating student debt for four years, young workers start earning salaries right away and learn how to manage money early." },
            { role: "Explain 2", vi: "Thêm vào đó, 4 năm kinh nghiệm thực chiến đôi khi gây ấn tượng với nhà tuyển dụng hơn học lý thuyết suông.", keywords: ["hands-on work experience", "employers", "theoretical"], sample: "In addition, four years of hands-on work experience can sometimes impress employers more than purely theoretical study." },
            { role: "Link", vi: "Do đó, đi làm sớm là con đường thiết thực cho người trẻ muốn tự chủ tài chính.", keywords: ["Thus", "practical", "financially driven"], sample: "Thus, working early is a practical and rewarding path for financially driven youth." }
        ],
        sampleConclusion: {
            en: "In conclusion, both options offer clear merits depending on a person's goals. However, in my opinion, obtaining a university degree is generally the better choice for long-term growth, because it provides broader career ceilings and higher earning potential—provided that students also seek internships to gain practical experience.",
            vi: "Tóm lại, cả hai lựa chọn đều có ưu điểm rõ ràng tùy mục tiêu mỗi người. Tuy nhiên, theo tôi, có bằng đại học nhìn chung tốt hơn cho phát triển dài hạn vì nó mở rộng trần nghề nghiệp và tiềm năng thu nhập cao hơn—miễn là sinh viên kết hợp đi thực tập để có kinh nghiệm thực tế."
        }
    },
    {
        id: 5,
        code: "Q5",
        title: "Q5 - Environment",
        framework: "C",
        frameworkName: "Agree / Disagree",
        minWords: 450,
        maxWords: 500,
        content: `Time: 60 minutes\n\nWriting Task\n\nWrite a 450-500-word essay responding to the following question:\n\nSome people think that all university students should be required to participate in environmental protection projects in their free time. They believe this would benefit both the individual student and society as a whole.\n\nDo you agree or disagree?`,
        quickHints: {
            stance: "Khuyên chọn: Disagree (Không nên bắt buộc, hãy khuyến khích tự nguyện qua quyền lợi)",
            vocab: [
                "compulsory (bắt buộc)",
                "create resentment (gây phản cảm/bất mãn)",
                "academic workloads (khối lượng học tập)",
                "positive incentives (động lực khuyến khích tích cực)",
                "voluntary involvement (sự tham gia tự nguyện)"
            ],
            body1Vi: [
                "Ép buộc làm vào giờ rảnh gây áp lực (sinh viên bận học, làm thêm) và dẫn tới đi điểm danh cho có."
            ],
            body2Vi: [
                "Khuyến khích tự nguyện (điểm rèn luyện, chứng nhận, ưu tiên học bổng, CLB Green Campus) hiệu quả và bền vững hơn nhiều."
            ]
        },
        stage2Intro: {
            template: "It is suggested that university students should be {{1}} to join {{2}} projects during their spare time for the good of both themselves and society. I {{3}} with making such activities compulsory, as forced participation reduces {{4}} and puts unfair pressure on students.",
            answers: ["legally required", "environmental", "disagree", "effectiveness"],
            distractors: ["forbidden", "sports", "strongly agree"],
            viTranslation: "Có đề xuất rằng sinh viên đại học nên bị bắt buộc tham gia các dự án bảo vệ môi trường trong thời gian rảnh vì lợi ích của cả bản thân và xã hội. Tôi không đồng ý việc bắt buộc các hoạt động này, vì ép buộc tham gia sẽ làm giảm hiệu quả và tạo áp lực bất công cho sinh viên."
        },
        stage3Body1: [
            { role: "Point", en: "Firstly, forcing students to join environmental campaigns in their free time often creates resentment rather than genuine environmental awareness.", vi: "Thứ nhất, ép sinh viên tham gia chiến dịch môi trường vào giờ rảnh thường gây phản cảm thay vì nhận thức môi trường thật sự." },
            { role: "Explain 1", en: "Many undergraduates already struggle to balance heavy academic workloads, exams, and part-time jobs needed to cover their living expenses.", vi: "Nhiều sinh viên vốn đã chật vật cân bằng giữa lịch học nặng, thi cử và việc làm thêm để trang trải chi phí sống." },
            { role: "Explain 2", en: "When volunteering becomes an unpaid obligation, tired students are likely to show up purely for attendance signatures without putting in real effort.", vi: "Khi tình nguyện trở thành nghĩa vụ không lương, sinh viên mệt mỏi có xu hướng chỉ đến điểm danh cho có mà không bỏ công sức thật." },
            { role: "Example", en: "For instance, mandatory campus clean-up days frequently see reluctant participants who leave as soon as the checklist is signed.", vi: "Ví dụ, các ngày dọn vệ sinh bắt buộc ở trường thường có nhiều người tham gia miễn cưỡng và bỏ về ngay khi vừa ký tên xong." },
            { role: "Link", en: "Therefore, compulsory rules can turn a noble cause into a meaningless chore.", vi: "Vì vậy, quy định bắt buộc có thể biến một mục tiêu cao đẹp thành việc vặt vô nghĩa." }
        ],
        stage4Body2: [
            { role: "Point", vi: "Thứ hai, các trường đại học có thể tạo tác động môi trường lớn hơn nhiều nhờ chính sách khuyến khích thay vì mệnh lệnh cứng nhắc.", keywords: ["Secondly", "positive incentives", "mandates"], sample: "Secondly, universities can achieve far greater environmental impact through positive incentives instead of strict mandates." },
            { role: "Explain", vi: "Trao điểm cộng, chứng nhận lãnh đạo hoặc ưu tiên học bổng sẽ thúc đẩy những sinh viên thực sự quan tâm tham gia nhiệt tình.", keywords: ["extra academic credits", "certificates", "motivates"], sample: "Offering extra academic credits, official leadership certificates, or scholarship priority motivates students who genuinely care about sustainability to join enthusiastically." },
            { role: "Example", vi: "Ví dụ, các câu lạc bộ Green Campus tự nguyện thường tổ chức thành công chiến dịch trồng cây và tái chế nhựa.", keywords: ["For example", "voluntary", "Green Campus"], sample: "For example, voluntary Green Campus clubs at many universities regularly run successful tree-planting and plastic-recycling drives with high creativity and energy." },
            { role: "Link", vi: "Kết quả là sự tham gia tự nguyện tạo ra cả sinh viên vui vẻ hơn lẫn kết quả tốt hơn cho xã hội.", keywords: ["As a result", "voluntary participation", "outcomes"], sample: "As a result, voluntary participation produces both happier students and better outcomes for society." }
        ],
        sampleConclusion: {
            en: "In conclusion, although environmental protection is crucial, I disagree with forcing all university students to participate in their free time. Encouraging voluntary involvement through meaningful incentives is a fairer and much more effective solution.",
            vi: "Tóm lại, dù bảo vệ môi trường rất quan trọng, tôi không đồng ý ép mọi sinh viên tham gia vào thời gian rảnh. Khuyến khích tự nguyện thông qua các phần thưởng thiết thực là giải pháp công bằng và hiệu quả hơn nhiều."
        }
    },
    {
        id: 6,
        code: "Q6",
        title: "Q6 - Work from Home",
        framework: "E",
        frameworkName: "Advantages vs. Disadvantages",
        minWords: 450,
        maxWords: 500,
        content: `Time: 60 minutes.\n\nCompose an essay of 450-500 words to address the question below:\n\nIn several countries, a growing number of young people are opting to work from home rather than going to the office.\n\nDo the advantages of this trend outweigh the disadvantages?`,
        quickHints: {
            stance: "Khuyên chọn: Advantages outweigh disadvantages (Tiết kiệm thời gian, linh hoạt vượt trội hơn nhược điểm có thể kiểm soát)",
            vocab: [
                "remote work (làm việc từ xa)",
                "rush-hour traffic (giao thông giờ cao điểm)",
                "work-life balance (cân bằng công việc – cuộc sống)",
                "social isolation (sự cô lập xã hội)",
                "blurred boundaries (ranh giới bị mờ nhạt)"
            ],
            body1Vi: [
                "Ưu 1: Tiết kiệm 1-2h kẹt xe & tiền xăng mỗi ngày (VD Hà Nội, TP.HCM).",
                "Ưu 2: Linh hoạt lịch trình, cân bằng công việc – cuộc sống và giảm ô nhiễm đô thị."
            ],
            body2Vi: [
                "Nhược: Cô lập xã hội, xao nhãng việc nhà, mờ ranh giới nghỉ ngơi.",
                "Phản biện Outweigh: Dễ kiểm soát qua họp video định kỳ, đặt giờ cố định hoặc ra co-working space."
            ]
        },
        stage2Intro: {
            template: "Nowadays, a growing number of young employees are choosing {{1}} instead of commuting daily to a traditional {{2}}. Although working from home creates certain {{3}}, I firmly believe that its {{4}} outweigh the disadvantages.",
            answers: ["remote work", "office", "drawbacks", "advantages"],
            distractors: ["early retirement", "factory", "profits"],
            viTranslation: "Ngày nay, ngày càng nhiều nhân viên trẻ chọn làm việc từ xa thay vì đi làm hàng ngày tới văn phòng truyền thống. Mặc dù làm việc tại nhà có một số nhược điểm, tôi hoàn toàn tin rằng ưu điểm của nó lớn hơn nhược điểm."
        },
        stage3Body1: [
            { role: "Point 1", en: "The first major advantage of remote work is saving valuable commuting time and money.", vi: "Ưu điểm lớn đầu tiên của làm việc từ xa là tiết kiệm thời gian và tiền bạc đi lại." },
            { role: "Explain + Example", en: "Without spending one to two hours stuck in rush-hour traffic every day, young workers lower their fuel costs and gain extra hours for sleep, exercise, or learning new skills.", vi: "Không mất 1–2 giờ kẹt xe giờ cao điểm mỗi ngày, nhân viên trẻ giảm tiền xăng và có thêm thời gian ngủ, tập thể dục hoặc học kỹ năng mới." },
            { role: "Point 2", en: "Another significant benefit is schedule flexibility and improved work-life balance.", vi: "Một lợi ích lớn khác là sự linh hoạt lịch trình và cải thiện cân bằng công việc – cuộc sống." },
            { role: "Explain 2", en: "Employees can design a quiet personal workspace and handle family responsibilities more easily, which often boosts productivity and job satisfaction.", vi: "Nhân viên có thể thiết kế góc làm việc yên tĩnh và xử lý việc gia đình dễ dàng hơn, thường giúp tăng năng suất và sự hài lòng." },
            { role: "Link", en: "Additionally, fewer daily commuters help reduce urban air pollution, benefiting society as a whole.", vi: "Thêm vào đó, ít người di chuyển hàng ngày giúp giảm ô nhiễm không khí đô thị, có lợi cho toàn xã hội." }
        ],
        stage4Body2: [
            { role: "Point", vi: "Phải thừa nhận làm việc tại nhà có những nhược điểm đáng kể, gồm sự cô lập xã hội và ranh giới công việc – nghỉ ngơi bị mờ nhạt.", keywords: ["Admittedly", "social isolation", "blurred"], sample: "Admittedly, working from home comes with notable drawbacks, including social isolation and blurred work-life boundaries." },
            { role: "Explain", vi: "Nhân viên trẻ làm một mình có thể thiếu trò chuyện với đồng nghiệp, khó làm việc nhóm hoặc dễ xao nhãng bởi việc nhà.", keywords: ["colleagues", "teamwork", "distractions"], sample: "Young staff who work alone in their bedrooms may miss casual conversations with colleagues, struggle with teamwork, or feel tempted by home distractions." },
            { role: "Counter", vi: "Tuy nhiên, các vấn đề này nhẹ hơn nhiều vì dễ kiểm soát nhờ họp video định kỳ và đặt giờ làm việc nghiêm ngặt.", keywords: ["However", "less serious", "video check-ins"], sample: "However, these problems are far less serious than the benefits because companies can organise regular video check-ins while workers set strict office hours." },
            { role: "Link", vi: "Chỉ cần kỷ luật đơn giản, nhân viên từ xa có thể tận hưởng lợi ích trọn vẹn.", keywords: ["discipline", "remote employees", "best of both worlds"], sample: "With simple discipline, remote employees can enjoy the best of both worlds." }
        ],
        sampleConclusion: {
            en: "To sum up, despite risks of isolation and distraction, the time savings, flexibility, and environmental gains of working from home are far more significant. Adopting smart routines or hybrid models will allow young workers to thrive.",
            vi: "Tóm lại, bất chấp rủi ro cô lập và xao nhãng, việc tiết kiệm thời gian, sự linh hoạt và lợi ích môi trường khi làm việc tại nhà vượt trội hơn nhiều. Áp dụng thói quen thông minh hoặc mô hình kết hợp (hybrid) sẽ giúp nhân viên trẻ phát triển mạnh."
        }
    },
    {
        id: 7,
        code: "Q7",
        title: "Q7 - Success Factors",
        framework: "D",
        frameworkName: "Discuss Both Views + Opinion",
        minWords: 450,
        maxWords: 500,
        content: `ESSAY\n\nTime: 60 minutes.\n\nCompose an essay of 450-500 words responding to the question below:\n\nMany people believe that good planning is the key factor to success in life, while hard work and supportive relationships are important.\n\nDiscuss both views and give your opinion.`,
        quickHints: {
            stance: "Khuyên chọn: Thành công bền vững cần kết hợp cả 3 (Planning = bản vẽ, Hard work = thi công, Relationships = nâng đỡ)",
            vocab: [
                "essential direction (định hướng thiết yếu)",
                "backup plan (phương án dự phòng)",
                "perseverance (sự kiên trì)",
                "emotional encouragement (động viên tinh thần)",
                "blueprint (bản thiết kế/bản vẽ)"
            ],
            body1Vi: [
                "View 1 (Planning): Tạo định hướng rõ, tránh lãng phí nguồn lực và có phương án dự phòng trước rủi ro thị trường."
            ],
            body2Vi: [
                "View 2 (Hard work & Relationships): Kỷ luật kiên trì biến kế hoạch trên giấy thành thật; gia đình, mentor mở cơ hội và nâng đỡ lúc khó."
            ]
        },
        stage2Intro: {
            template: "People hold different opinions about whether careful {{1}} is the primary key to {{2}}, or whether {{3}} and supportive relationships matter more. This essay will examine both perspectives before explaining why I believe lasting success requires a {{4}} of all three factors.",
            answers: ["planning", "success", "hard work", "combination"],
            distractors: ["luck", "failure", "separation"],
            viTranslation: "Mọi người có quan điểm khác nhau về việc lập kế hoạch cẩn thận là chìa khóa chính của thành công, hay sự chăm chỉ và các mối quan hệ hỗ trợ mới quan trọng hơn. Bài viết sẽ xem xét cả hai góc nhìn trước khi giải thích vì sao tôi tin thành công bền vững đòi hỏi sự kết hợp của cả ba yếu tố."
        },
        stage3Body1: [
            { role: "Point", en: "Those who emphasise good planning argue that clear goals and strategies provide essential direction.", vi: "Những người nhấn mạnh việc lập kế hoạch tốt cho rằng mục tiêu và chiến lược rõ ràng mang lại định hướng thiết yếu." },
            { role: "Explain", en: "Without a structured plan, even talented individuals can waste time and resources on unimportant tasks or feel overwhelmed by unexpected risks.", vi: "Không có kế hoạch bài bản, ngay cả người tài năng cũng có thể lãng phí thời gian, nguồn lực hoặc choáng ngợp trước rủi ro bất ngờ." },
            { role: "Example", en: "For instance, an entrepreneur who prepares a detailed financial roadmap and backup plan is far more likely to survive market downturns than someone who acts purely on impulse.", vi: "Ví dụ, một chủ doanh nghiệp chuẩn bị lộ trình tài chính và phương án dự phòng có khả năng sống sót qua suy thoái cao hơn người hành động cảm tính." },
            { role: "Link", en: "Therefore, smart planning acts as a compass that keeps effort focused on the right destination.", vi: "Vì vậy, lập kế hoạch thông minh đóng vai trò như chiếc la bàn giữ nỗ lực đi đúng hướng." }
        ],
        stage4Body2: [
            { role: "Point", vi: "Mặt khác, nhiều người tin rằng sự chăm chỉ không ngừng và các mối quan hệ vững chắc mới biến tham vọng thành hiện thực.", keywords: ["On the other hand", "hard work", "ambitions"], sample: "On the other hand, others believe that tireless hard work and strong relationships are what actually turn ambitions into reality." },
            { role: "Explain 1", vi: "Ngay cả kế hoạch xuất sắc nhất cũng vô dụng trên giấy nếu thiếu kỷ luật hàng ngày và sự kiên trì học từ thất bại.", keywords: ["useless on paper", "discipline", "perseverance"], sample: "Even the most brilliant plan remains useless on paper unless a person demonstrates daily discipline, perseverance, and willingness to learn from failure." },
            { role: "Explain 2", vi: "Quan trọng không kém, gia đình, người dẫn dắt và đồng nghiệp luôn ủng hộ mang lại động viên tinh thần và cơ hội nghề nghiệp.", keywords: ["mentors", "emotional encouragement", "career opportunities"], sample: "Equally important, supportive family members, mentors, and colleagues provide emotional encouragement, valuable advice, and career opportunities during difficult times." },
            { role: "Link", vi: "Do đó, sự quyết tâm và hỗ trợ từ con người mới là động cơ thực sự của thành tựu.", keywords: ["Consequently", "determination", "engines"], sample: "Consequently, determination and human support are the real engines of achievement." }
        ],
        sampleConclusion: {
            en: "In conclusion, both planning and the combination of hard work with supportive relationships play crucial roles in achieving success. In my opinion, none of these elements can guarantee success alone: good planning provides the blueprint, hard work builds the structure, and supportive relationships sustain us throughout the journey.",
            vi: "Tóm lại, cả lập kế hoạch lẫn sự kết hợp giữa chăm chỉ và các mối quan hệ đều đóng vai trò cốt yếu. Theo tôi, không yếu tố nào tự đảm bảo thành công một mình: lập kế hoạch tạo ra bản vẽ, chăm chỉ xây nên công trình, còn các mối quan hệ nâng đỡ ta suốt hành trình."
        }
    },
    {
        id: 8,
        code: "Q8",
        title: "Q8 - Taking Risks",
        framework: "E",
        frameworkName: "Advantages vs. Disadvantages",
        minWords: 350,
        maxWords: 400,
        content: `Time: 60 minutes\nWrite an essay of 350–400 words to answer the following question:\n\nIt is important to take risks in both their professional and personal lives. Do you think the advantages of taking risks outweigh the disadvantages?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.`,
        quickHints: {
            stance: "Khuyên chọn: Advantages outweigh disadvantages (nhấn mạnh 'calculated risks' để phản biện)",
            vocab: [
                "comfort zone (vùng an toàn)",
                "remarkable breakthroughs (bước đột phá đáng kể)",
                "resilience (bản lĩnh/sự kiên cường)",
                "calculated risks (rủi ro có tính toán)",
                "safety net (lưới an toàn)"
            ],
            body1Vi: [
                "Ưu 1: Cơ hội bứt phá và phát triển bản thân (rời việc bế tắc để mở kinh doanh hoặc đến thành phố mới).",
                "Ưu 2: Rèn bản lĩnh, tự tin và rút ra bài học giá trị ngay cả khi thất bại."
            ],
            body2Vi: [
                "Nhược: Mất tiền, tốn thời gian, căng thẳng nếu đầu tư bừa bãi.",
                "Phản biện Outweigh: Rủi ro giảm mạnh khi ta tính toán kỹ ('calculated risks') và chuẩn bị lưới an toàn trước."
            ]
        },
        stage2Intro: {
            template: "In both work and personal life, people often face moments where stepping out of their {{1}} involves taking {{2}}. Although taking risks carries possible {{3}}, I believe that the {{4}} clearly outweigh the disadvantages.",
            answers: ["comfort zone", "risks", "losses", "advantages"],
            distractors: ["safety net", "holidays", "rewards"],
            viTranslation: "Trong cả công việc lẫn đời sống cá nhân, con người thường đối mặt với những khoảnh khắc bước ra khỏi vùng an toàn đòi hỏi phải chấp nhận rủi ro. Dù chấp nhận rủi ro mang theo khả năng mất mát, tôi tin rằng ưu điểm rõ ràng vượt trội hơn nhược điểm."
        },
        stage3Body1: [
            { role: "Point 1", en: "The first major advantage of taking risks is the opportunity for remarkable success and personal growth.", vi: "Ưu điểm lớn đầu tiên của việc chấp nhận rủi ro là cơ hội đạt thành công vượt bậc và phát triển bản thân." },
            { role: "Explain + Example", en: "Without trying uncertain paths, people rarely achieve breakthroughs, such as leaving a safe but dead-end job to launch a small business.", vi: "Không thử những con đường chưa chắc chắn, con người hiếm khi có bước đột phá, như rời công việc bế tắc để khởi nghiệp nhỏ." },
            { role: "Point 2", en: "Another key benefit is building resilience and self-confidence.", vi: "Một lợi ích quan trọng khác là rèn luyện bản lĩnh và sự tự tin." },
            { role: "Explain 2", en: "Even when a risky decision fails, individuals gain valuable lessons that prepare them to make smarter choices in the future.", vi: "Ngay cả khi một quyết định mạo hiểm thất bại, mỗi cá nhân vẫn rút ra bài học quý giá giúp đưa ra lựa chọn sáng suốt hơn." },
            { role: "Link", en: "These long-term gains make risk-taking essential for progress.", vi: "Những lợi ích dài hạn này khiến việc dám mạo hiểm trở nên thiết yếu cho sự tiến bộ." }
        ],
        stage4Body2: [
            { role: "Point", vi: "Phải thừa nhận chấp nhận rủi ro có thể dẫn đến mất tiền, tốn thời gian và căng thẳng tinh thần.", keywords: ["Admittedly", "financial loss", "emotional stress"], sample: "Admittedly, taking risks can lead to financial loss, wasted time, and emotional stress." },
            { role: "Explain", vi: "Ví dụ, dồn hết tiền tiết kiệm vào ý tưởng chưa kiểm chứng hay cam kết vội vàng có thể gây hối tiếc và bất ổn nghiêm trọng.", keywords: ["For instance", "savings", "instability"], sample: "For instance, investing all of one's savings into an untested idea or entering a hasty commitment can cause serious regret and instability." },
            { role: "Counter", vi: "Tuy nhiên, những nguy hiểm này nhỏ hơn nhiều khi người ta chấp nhận rủi ro có tính toán thay vì đánh bạc liều lĩnh.", keywords: ["However", "calculated risks", "reckless"], sample: "However, these dangers are much smaller when people take calculated risks rather than reckless gambles." },
            { role: "Link", vi: "Bằng cách nghiên cứu kỹ và chuẩn bị lưới an toàn trước, mỗi người có thể giới hạn thiệt hại trong khi vẫn mở rộng cơ hội.", keywords: ["safety net", "limit potential damage"], sample: "By researching thoroughly and preparing a safety net beforehand, individuals can limit potential damage while keeping the upside open." }
        ],
        sampleConclusion: {
            en: "To sum up, despite the possibility of setbacks and stress, the growth and rewards of taking risks are far more significant. Embracing well-calculated risks is the surest way to build a meaningful career and life.",
            vi: "Tóm lại, bất chấp khả năng vấp ngã và căng thẳng, sự trưởng thành và phần thưởng của việc chấp nhận rủi ro lớn hơn nhiều. Đón nhận những rủi ro có tính toán là cách chắc chắn nhất để xây dựng sự nghiệp và cuộc sống ý nghĩa."
        }
    },
    {
        id: 9,
        code: "Q9",
        title: "Q9 - Competition vs Cooperation",
        framework: "D",
        frameworkName: "Discuss Both Views + Opinion",
        minWords: 350,
        maxWords: 400,
        content: `Write an essay of 350–400 words to answer the following question:\n\nSome people think that competition at work, at school, and in daily life is a good thing. Others believe we should cooperate more rather than compete with each other.\n\nDiscuss both these views and give your own opinion.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.`,
        quickHints: {
            stance: "Khuyên chọn: Lấy hợp tác làm nền tảng, giữ cạnh tranh lành mạnh để thúc đẩy tiến bộ",
            vocab: [
                "contrasting views (quan điểm trái ngược)",
                "drive innovation (thúc đẩy đổi mới)",
                "excessive rivalry (ganh đua quá mức)",
                "collective progress (tiến bộ tập thể)",
                "social harmony (sự hòa hợp xã hội)"
            ],
            body1Vi: [
                "View 1 (Competition): Thúc đẩy nỗ lực, đổi mới và chuẩn mực cao (VD: các hãng smartphone cạnh tranh tạo camera/pin tốt hơn)."
            ],
            body2Vi: [
                "View 2 (Cooperation): Giải quyết mục tiêu lớn, giảm căng thẳng, kết hợp thế mạnh (VD: dự án nhóm đại học, nghiên cứu y khoa)."
            ]
        },
        stage2Intro: {
            template: "People hold contrasting views on whether {{1}} or {{2}} brings better outcomes at school, at work, and in daily life. This essay will discuss both {{3}} before arguing that a healthy {{4}} of the two is the ideal approach.",
            answers: ["competition", "cooperation", "perspectives", "balance"],
            distractors: ["laziness", "conflict", "rejection"],
            viTranslation: "Mọi người có quan điểm trái ngược về việc cạnh tranh hay hợp tác mang lại kết quả tốt hơn ở trường học, công việc và đời sống. Bài viết sẽ thảo luận cả hai góc nhìn trước khi lập luận rằng sự cân bằng lành mạnh giữa cả hai là cách tiếp cận lý tưởng."
        },
        stage3Body1: [
            { role: "Point", en: "Supporters of competition argue that it drives effort, innovation, and higher standards.", vi: "Những người ủng hộ cạnh tranh cho rằng nó thúc đẩy nỗ lực, sự đổi mới và tiêu chuẩn cao hơn." },
            { role: "Explain", en: "When students or companies compete for top grades, scholarships, or market share, they are strongly motivated to work harder and improve their quality.", vi: "Khi học sinh hay công ty cạnh tranh giành điểm cao, học bổng hay thị phần, họ có động lực mạnh mẽ để cố gắng hơn và nâng cao chất lượng." },
            { role: "Example", en: "For instance, fierce competition among smartphone brands has pushed manufacturers to create better cameras, longer battery life, and fairer prices for consumers.", vi: "Ví dụ, sự cạnh tranh khốc liệt giữa các hãng điện thoại đã thúc đẩy nhà sản xuất tạo ra camera tốt hơn, pin lâu hơn và giá hợp lý hơn." },
            { role: "Link", en: "Therefore, constructive competition pushes individuals and society beyond average performance.", vi: "Vì vậy, cạnh tranh tích cực đẩy cá nhân và xã hội vượt qua mức trung bình." }
        ],
        stage4Body2: [
            { role: "Point", vi: "Mặt khác, người ủng hộ hợp tác tin rằng làm việc cùng nhau giúp đạt mục tiêu lớn hơn và giảm căng thẳng.", keywords: ["On the other hand", "cooperation", "lowers stress"], sample: "On the other hand, advocates of cooperation believe that working together achieves larger goals and lowers stress." },
            { role: "Explain", vi: "Những thách thức phức tạp hiếm khi giải quyết bởi một người; hợp tác cho phép kết hợp thế mạnh và chia sẻ kiến thức.", keywords: ["collaboration", "combine", "share knowledge"], sample: "Complex challenges today are rarely solved by one person alone; collaboration allows people to combine different strengths, share knowledge, and build trust." },
            { role: "Example", vi: "Ví dụ, dự án nhóm đại học và nghiên cứu y khoa quốc tế phụ thuộc vào teamwork, còn ganh đua quá mức gây lo âu.", keywords: ["For example", "teamwork", "excessive rivalry"], sample: "For example, university group projects and international medical research rely heavily on teamwork to succeed, whereas excessive rivalry often causes anxiety and selfishness." },
            { role: "Link", vi: "Do đó, hợp tác thúc đẩy cả tiến bộ tập thể lẫn sự hòa hợp xã hội.", keywords: ["Thus", "collective progress", "social harmony"], sample: "Thus, cooperation fosters both collective progress and social harmony." }
        ],
        sampleConclusion: {
            en: "In conclusion, both competition and cooperation offer clear benefits. In my opinion, we should prioritise cooperation as our foundation while keeping healthy competition alive, because teamwork unites people and friendly rivalry motivates everyone to improve.",
            vi: "Tóm lại, cả cạnh tranh và hợp tác đều có lợi ích rõ ràng. Theo tôi, ta nên lấy hợp tác làm nền tảng đồng thời giữ sự cạnh tranh lành mạnh, vì làm việc nhóm gắn kết con người còn thi đua thân thiện thúc đẩy mọi người cùng tiến bộ."
        }
    },
    {
        id: 10,
        code: "Q10",
        title: "Q10 - Smartphone Overuse",
        framework: "A",
        frameworkName: "Cause + Solution",
        minWords: 350,
        maxWords: 400,
        content: `Writing topic\n\nThe excessive use of smartphones among young people has significantly reduced face-to-face communication. Nevertheless, effective measures can be taken to address this issue and encourage healthier social habits.\n\nWrite an essay (350–400 words) explaining the causes behind smartphone overuse among youth and suggesting practical solutions to improve face-to-face interaction.`,
        quickHints: {
            stance: "Thân 1: Nguyên nhân (thuật toán gây nghiện + FOMO) • Thân 2: Giải pháp (giới hạn giờ + hoạt động offline)",
            vocab: [
                "smartphone addiction (nghiện điện thoại)",
                "face-to-face interaction (tương tác trực tiếp)",
                "addictive algorithms (thuật toán gây nghiện)",
                "phone-free zones (khu vực không điện thoại)",
                "genuine connections (kết nối chân thực)"
            ],
            body1Vi: [
                "Point 1: Thiết kế gây nghiện của mạng xã hội/video ngắn (thuật toán gợi ý liên tục, lướt TikTok trong bữa tối).",
                "Point 2: Nỗi sợ bị bỏ lỡ (FOMO) khiến màn hình thay thế trò chuyện thật."
            ],
            body2Vi: [
                "Point 1: Nâng cao nhận thức và lập 'khu vực không điện thoại' ở nhà (bữa ăn, giờ học).",
                "Point 2: Trường học/cộng đồng tổ chức CLB thể thao, tình nguyện, board game."
            ]
        },
        stage2Intro: {
            template: "In recent years, {{1}} has become increasingly {{2}} among young people, weakening direct human interaction. This essay will examine the main {{3}} of this habit and propose practical {{4}} to restore face-to-face communication.",
            answers: ["smartphone addiction", "common", "causes", "solutions"],
            distractors: ["reading books", "rare", "profits"],
            viTranslation: "Gần đây, nghiện điện thoại ngày càng phổ biến ở giới trẻ, làm suy yếu tương tác trực tiếp giữa người với người. Bài viết sẽ phân tích nguyên nhân chính của thói quen này và đề xuất giải pháp thực tế để khôi phục giao tiếp trực tiếp."
        },
        stage3Body1: [
            { role: "Point 1", en: "One primary cause is the addictive design of social media and short-video platforms.", vi: "Một nguyên nhân chính là thiết kế gây nghiện của mạng xã hội và các nền tảng video ngắn." },
            { role: "Explain", en: "Algorithms constantly recommend entertaining content, making it difficult for teenagers to put their phones down.", vi: "Thuật toán liên tục gợi ý nội dung giải trí, khiến thanh thiếu niên khó đặt điện thoại xuống." },
            { role: "Example", en: "For instance, many students spend hours scrolling through TikTok instead of talking with their family during dinner.", vi: "Ví dụ, nhiều học sinh dành hàng giờ lướt TikTok thay vì trò chuyện với gia đình trong bữa tối." },
            { role: "Point 2", en: "Another reason is the fear of missing out (FOMO).", vi: "Một lý do khác là nỗi sợ bị bỏ lỡ (FOMO)." },
            { role: "Link", en: "As a result, digital screens gradually replace real-life conversations.", vi: "Kết quả là màn hình số dần thay thế các cuộc trò chuyện ngoài đời thực." }
        ],
        stage4Body2: [
            { role: "Point 1", vi: "Nâng cao nhận thức và đặt giới hạn thời gian dùng màn hình là giải pháp đầu tiên.", keywords: ["Raising awareness", "screen-time limits", "first solution"], sample: "Raising awareness and setting screen-time limits is the first solution." },
            { role: "Explain", vi: "Phụ huynh và học sinh có thể lập các khu vực không điện thoại ở nhà, đặc biệt trong giờ ăn và giờ học.", keywords: ["phone-free zones", "meals", "study hours"], sample: "Parents and students can establish phone-free zones at home, especially during meals and study hours." },
            { role: "Point 2", vi: "Ngoài ra, trường học và cộng đồng nên tổ chức nhiều hoạt động nhóm trực tiếp hơn như CLB thể thao hay tình nguyện.", keywords: ["In addition", "offline group activities", "sports clubs"], sample: "In addition, schools and communities should organise more offline group activities such as sports clubs and volunteer events." },
            { role: "Link", vi: "Những hành động này có thể xây dựng lại các kết nối xã hội chân thực.", keywords: ["These actions", "rebuild", "genuine social connections"], sample: "These actions can rebuild genuine social connections." }
        ],
        sampleConclusion: {
            en: "In conclusion, smartphone overuse is mainly driven by addictive apps and FOMO. However, through daily screen limits and engaging offline activities, young people can regain meaningful face-to-face communication.",
            vi: "Tóm lại, việc lạm dụng smartphone chủ yếu do ứng dụng gây nghiện và tâm lý FOMO. Tuy nhiên, nhờ giới hạn giờ dùng màn hình và các hoạt động ngoại tuyến hấp dẫn, giới trẻ có thể tìm lại giao tiếp trực tiếp ý nghĩa."
        }
    },
    {
        id: 11,
        code: "Q11",
        title: "Q11 - Brain Drain",
        framework: "A",
        frameworkName: "Cause + Solution",
        minWords: 450,
        maxWords: 500,
        content: `Time: 60 minutes\n\nWrite an essay of 450–500 words responding to the question below:\n\nMany developing countries are experiencing "brain drain" as highly skilled graduates choose to move abroad for work.\n\nWhat are the main causes of this phenomenon, and what measures can governments take to address it?`,
        quickHints: {
            stance: "Thân 1: Nguyên nhân (chênh lệch lương + thiếu môi trường nghiên cứu) • Thân 2: Giải pháp (đãi ngộ + khu công nghệ)",
            vocab: [
                "skilled professionals (chuyên gia tay nghề cao)",
                "living standards (mức sống)",
                "career progression (thăng tiến nghề nghiệp)",
                "financial incentives (đãi ngộ tài chính)",
                "innovation ecosystem (hệ sinh thái đổi mới)"
            ],
            body1Vi: [
                "Point 1: Chênh lệch lớn về tiền lương và mức sống (kỹ sư/bác sĩ kiếm gấp 3-5 lần ở châu Âu, Bắc Mỹ).",
                "Point 2: Cơ sở nghiên cứu hạn chế và lộ trình thăng tiến chậm."
            ],
            body2Vi: [
                "Point 1: Đãi ngộ tài chính cạnh tranh (giảm thuế, tài trợ nghiên cứu, thăng tiến theo năng lực).",
                "Point 2: Đầu tư trung tâm đổi mới sáng tạo & hỗ trợ startup (VD Singapore, Hàn Quốc)."
            ]
        },
        stage2Intro: {
            template: "Nowadays, a growing number of {{1}} from developing nations are migrating to wealthier countries in search of better {{2}}. This essay will explore the primary {{3}} behind brain drain and suggest effective {{4}} that governments can adopt to retain skilled workers.",
            answers: ["talented graduates", "opportunities", "reasons", "measures"],
            distractors: ["tourists", "obstacles", "debts"],
            viTranslation: "Ngày nay, ngày càng nhiều sinh viên giỏi từ các nước đang phát triển di cư sang các nước giàu có hơn để tìm cơ hội tốt hơn. Bài viết sẽ tìm hiểu nguyên nhân chính đằng sau tình trạng chảy máu chất xám và gợi ý các biện pháp hiệu quả để chính phủ giữ chân nhân tài."
        },
        stage3Body1: [
            { role: "Point 1", en: "The foremost cause of brain drain is the large gap in salaries and living standards.", vi: "Nguyên nhân hàng đầu của chảy máu chất xám là khoảng cách lớn về tiền lương và mức sống." },
            { role: "Explain", en: "Skilled professionals often receive far lower wages in their home countries compared to developed economies.", vi: "Nhân sự tay nghề cao thường nhận mức lương thấp hơn nhiều ở quê nhà so với các nền kinh tế phát triển." },
            { role: "Example", en: "For example, a software engineer or medical researcher may earn three to five times more in Europe or North America.", vi: "Ví dụ, một kỹ sư phần mềm hay nhà nghiên cứu y khoa có thể kiếm thu nhập cao gấp 3 đến 5 lần ở châu Âu hoặc Bắc Mỹ." },
            { role: "Point 2", en: "Moreover, limited research facilities and slow career progression push ambitious young people away.", vi: "Hơn nữa, cơ sở nghiên cứu hạn chế và lộ trình thăng tiến chậm đẩy những người trẻ đầy tham vọng ra đi." },
            { role: "Link", en: "Consequently, developing nations lose the very experts needed for national growth.", vi: "Do đó, các nước đang phát triển mất đi chính những chuyên gia cần thiết cho sự phát triển đất nước." }
        ],
        stage4Body2: [
            { role: "Point 1", vi: "Thứ nhất, chính phủ nên cung cấp đãi ngộ tài chính cạnh tranh và điều kiện làm việc tốt hơn.", keywords: ["Firstly", "financial incentives", "working conditions"], sample: "Firstly, governments should offer competitive financial incentives and better working conditions." },
            { role: "Explain", vi: "Giảm thuế, tài trợ nghiên cứu và thăng tiến dựa trên năng lực có thể khiến công việc trong nước hấp dẫn hơn nhiều.", keywords: ["Tax reductions", "research grants", "merit-based"], sample: "Tax reductions, research grants, and merit-based promotions can make domestic jobs much more attractive." },
            { role: "Point 2", vi: "Thứ hai, các quốc gia nên đầu tư vào trung tâm đổi mới sáng tạo và hỗ trợ khởi nghiệp trong nước như Singapore hay Hàn Quốc.", keywords: ["Secondly", "innovation hubs", "startups"], sample: "Secondly, nations should invest in innovation hubs and support local startups, just as Singapore and South Korea did." },
            { role: "Link", vi: "Vì vậy, tạo ra môi trường nơi nhân tài được trân trọng là giải pháp bền vững nhất.", keywords: ["Therefore", "talent is valued", "sustainable solution"], sample: "Therefore, creating an environment where talent is valued is the most sustainable solution." }
        ],
        sampleConclusion: {
            en: "In conclusion, brain drain stems primarily from low domestic wages and limited career prospects. By improving financial rewards and building strong innovation ecosystems, developing countries can turn brain drain into brain gain.",
            vi: "Tóm lại, chảy máu chất xám xuất phát chủ yếu từ lương trong nước thấp và triển vọng nghề nghiệp hạn chế. Nhờ cải thiện đãi ngộ và xây dựng hệ sinh thái đổi mới mạnh mẽ, các nước đang phát triển có thể biến chảy máu chất xám thành thu hút chất xám."
        }
    },
    {
        id: 12,
        code: "Q12",
        title: "Q12 - AI in University",
        framework: "B",
        frameworkName: "Two-Part Question",
        minWords: 350,
        maxWords: 400,
        content: `Writing topic\n\nArtificial intelligence (AI) tools such as ChatGPT are now widely used by university students for their studies.\n\nWrite an essay (350–400 words) discussing how these tools affect students' learning process and whether this is a positive or negative development.`,
        quickHints: {
            stance: "Thân 1: Tác động 2 mặt (gia sư 24/7 vs ỷ lại) • Thân 2: Chủ yếu tích cực nếu hướng dẫn dùng có đạo đức",
            vocab: [
                "personal tutor (gia sư cá nhân)",
                "over-reliance (sự ỷ lại quá mức)",
                "critical thinking (tư duy phản biện)",
                "academic integrity (liêm chính học thuật)",
                "AI-driven workplace (môi trường làm việc ứng dụng AI)"
            ],
            body1Vi: [
                "Lợi: Gia sư 24/7 giải thích khái niệm khó, tóm tắt tài liệu, sửa lỗi code/ngữ pháp.",
                "Rủi ro: Sao chép đáp án làm giảm tư duy phản biện."
            ],
            body2Vi: [
                "Chủ yếu tích cực: giống máy tính bỏ túi & Internet; trường có thể đổi cách thi (thuyết trình, kiểm chứng AI) để chuẩn bị cho thị trường lao động AI."
            ]
        },
        stage2Intro: {
            template: "Artificial intelligence tools have {{1}} the way university students {{2}} and complete assignments. This essay will examine how AI {{3}} the learning process and argue that it is largely a {{4}} development if used responsibly.",
            answers: ["rapidly transformed", "study", "influences", "positive"],
            distractors: ["banned", "sleep", "harmful"],
            viTranslation: "Các công cụ trí tuệ nhân tạo đã nhanh chóng thay đổi cách sinh viên đại học học tập và hoàn thành bài tập. Bài viết sẽ phân tích cách AI ảnh hưởng tới quá trình học và lập luận rằng đây chủ yếu là bước tiến tích cực nếu được sử dụng có trách nhiệm."
        },
        stage3Body1: [
            { role: "Point", en: "AI tools reshape student learning in both helpful and risky ways.", vi: "Công cụ AI định hình lại việc học của sinh viên theo cả hướng có lợi lẫn rủi ro." },
            { role: "Explain 1", en: "On the one hand, AI acts as a 24/7 personal tutor that explains complex concepts, summarises readings, and checks grammar instantly.", vi: "Một mặt, AI đóng vai trò gia sư cá nhân 24/7 giải thích khái niệm khó, tóm tắt tài liệu và sửa ngữ pháp tức thì." },
            { role: "Example", en: "For example, programming students can ask AI to explain why their code has errors instead of waiting days for a lecturer.", vi: "Ví dụ, sinh viên lập trình có thể hỏi AI giải thích vì sao code lỗi thay vì đợi giảng viên nhiều ngày." },
            { role: "Explain 2", en: "On the other hand, over-reliance on AI can reduce critical thinking when students simply copy generated answers.", vi: "Mặt khác, ỷ lại quá mức vào AI có thể làm giảm tư duy phản biện khi sinh viên chỉ sao chép câu trả lời có sẵn." },
            { role: "Link", en: "Thus, AI dramatically speeds up learning, but also changes how effort is invested.", vi: "Do đó, AI đẩy nhanh tốc độ học đáng kể, nhưng cũng thay đổi cách sinh viên bỏ công sức." }
        ],
        stage4Body2: [
            { role: "Point", vi: "Dù có lo ngại về gian lận, tôi tin sự phát triển của AI trong giáo dục chủ yếu là xu hướng tích cực.", keywords: ["Despite concerns", "positive trend", "education"], sample: "Despite concerns about cheating, I believe the rise of AI in education is mainly a positive trend." },
            { role: "Explain", vi: "Công nghệ luôn thay đổi giáo dục giống như Internet trước đây; mấu chốt là dạy sinh viên dùng AI có đạo đức.", keywords: ["reshaped education", "Internet", "ethically"], sample: "Technology has always reshaped education, just as calculators and the Internet did in the past; the key is teaching students how to use AI ethically." },
            { role: "Example", vi: "Các trường đại học có thể thiết kế lại bài thi tập trung vào thuyết trình, giải quyết vấn đề và kiểm chứng đầu ra của AI.", keywords: ["redesign exams", "oral presentations", "verifying"], sample: "Universities can redesign exams to focus on oral presentations, problem-solving, and verifying AI outputs." },
            { role: "Link", vi: "Vì vậy, khi được hướng dẫn đúng cách, AI giúp sinh viên sẵn sàng cho môi trường làm việc ứng dụng AI.", keywords: ["Therefore", "guided properly", "AI-driven workplace"], sample: "Therefore, when guided properly, AI prepares graduates for an AI-driven workplace." }
        ],
        sampleConclusion: {
            en: "In conclusion, AI tools make university learning faster and more accessible, although they carry risks of over-dependence. Overall, this is a positive development as long as schools promote responsible usage.",
            vi: "Tóm lại, công cụ AI giúp việc học đại học nhanh và dễ tiếp cận hơn, dù tiềm ẩn rủi ro ỷ lại. Nhìn chung, đây là bước tiến tích cực miễn là nhà trường thúc đẩy việc sử dụng có trách nhiệm."
        }
    },
    {
        id: 13,
        code: "Q13",
        title: "Q13 - Cashless Society",
        framework: "B",
        frameworkName: "Two-Part Question",
        minWords: 450,
        maxWords: 500,
        content: `Time: 60 minutes\n\nWrite an essay of 450–500 words responding to the question below:\n\nDigital and cashless payments are rapidly replacing physical money in many countries.\n\nWhy is this trend happening, and what potential risks does a cashless society pose to individuals and communities?`,
        quickHints: {
            stance: "Thân 1: Nguyên nhân (tiện lợi QR/TMĐT + minh bạch tài chính) • Thân 2: Rủi ro (an ninh mạng + nhóm yếu thế + tiêu quá tay)",
            vocab: [
                "e-commerce boom (bùng nổ thương mại điện tử)",
                "financial transparency (minh bạch tài chính)",
                "cybersecurity threats (mối đe dọa an ninh mạng)",
                "social exclusion (gạt ra bên lề xã hội)",
                "overspend (chi tiêu quá tay)"
            ],
            body1Vi: [
                "Trả tiền bằng điện thoại/QR chỉ mất vài giây (VD: Việt Nam quét QR từ cà phê vỉa hè đến hóa đơn), giảm chi phí in tiền & tăng minh bạch."
            ],
            body2Vi: [
                "Rủi ro 1: Lừa đảo online, rò rỉ dữ liệu, lỗi hệ thống đóng băng tài khoản.",
                "Rủi ro 2: Người già/vùng nông thôn thiếu smartphone; tâm lý chạm thẻ dễ chi tiêu quá tay."
            ]
        },
        stage2Intro: {
            template: "Across the globe, {{1}} methods such as e-wallets and QR codes are quickly {{2}} traditional cash. This essay will explain the main {{3}} behind this shift and examine the potential {{4}} it poses to society.",
            answers: ["digital payment", "replacing", "drivers", "risks"],
            distractors: ["barter", "printing", "prizes"],
            viTranslation: "Trên toàn cầu, các phương thức thanh toán số như ví điện tử và mã QR đang nhanh chóng thay thế tiền mặt truyền thống. Bài viết sẽ giải thích các động lực chính đằng sau sự chuyển dịch này và phân tích những rủi ro tiềm ẩn đối với xã hội."
        },
        stage3Body1: [
            { role: "Point", en: "The shift toward cashless payments is driven primarily by convenience and the boom of e-commerce.", vi: "Sự chuyển dịch sang thanh toán không tiền mặt xuất phát chủ yếu từ sự tiện lợi và bùng nổ thương mại điện tử." },
            { role: "Explain 1", en: "Paying with a smartphone takes only seconds and removes the hassle of carrying coins or waiting for change.", vi: "Thanh toán bằng điện thoại chỉ mất vài giây và loại bỏ sự phiền phức khi mang tiền lẻ hay chờ thối tiền." },
            { role: "Example", en: "In Vietnam, consumers can now scan a QR code to pay for everything from street coffee to utility bills.", vi: "Ở Việt Nam, người tiêu dùng giờ có thể quét mã QR để trả mọi thứ từ cà phê vỉa hè đến hóa đơn điện nước." },
            { role: "Explain 2", en: "Furthermore, governments and banks actively encourage digital transactions because they reduce printing costs and improve financial transparency.", vi: "Hơn nữa, chính phủ và ngân hàng tích cực khuyến khích giao dịch số vì giảm chi phí in tiền và tăng minh bạch tài chính." },
            { role: "Link", en: "As a result, cashless payment has become the default choice for daily life.", vi: "Kết quả là thanh toán không tiền mặt đã trở thành lựa chọn mặc định trong đời sống hàng ngày." }
        ],
        stage4Body2: [
            { role: "Point", vi: "Tuy nhiên, một xã hội hoàn toàn không tiền mặt mang lại rủi ro nghiêm trọng về an ninh mạng và sự gạt ra bên lề xã hội.", keywords: ["However", "cybersecurity", "social exclusion"], sample: "However, a completely cashless society brings serious risks regarding cybersecurity and social exclusion." },
            { role: "Explain 1", vi: "Thứ nhất, lừa đảo trực tuyến, rò rỉ dữ liệu và lỗi hệ thống có thể làm đóng băng quyền truy cập vào tiền của người dân.", keywords: ["online scams", "data breaches", "freeze"], sample: "First, online scams, data breaches, and technical outages can freeze people's access to their own money." },
            { role: "Explain 2", vi: "Thứ hai, người cao tuổi và nhóm thu nhập thấp thiếu smartphone có thể chật vật mua nhu yếu phẩm, còn người trẻ dễ tiêu quá tay khi chạm thẻ.", keywords: ["elderly citizens", "basic necessities", "overspend"], sample: "Second, elderly citizens without smartphones may struggle to buy basic necessities, while shoppers tend to overspend when tapping a card." },
            { role: "Link", vi: "Do đó, xã hội cần giữ tiền mặt như phương án dự phòng đồng thời tăng cường bảo mật số.", keywords: ["Thus", "backup option", "digital security"], sample: "Thus, society must keep cash as a backup option while strengthening digital security." }
        ],
        sampleConclusion: {
            en: "In conclusion, cashless payments are growing rapidly due to unmatched convenience and online shopping. Nevertheless, governments must address cybersecurity threats and protect vulnerable groups before phasing out physical money.",
            vi: "Tóm lại, thanh toán không tiền mặt phát triển nhanh nhờ sự tiện lợi vượt trội và mua sắm trực tuyến. Dù vậy, chính phủ cần giải quyết mối đe dọa an ninh mạng và bảo vệ nhóm yếu thế trước khi loại bỏ tiền mặt."
        }
    },
    {
        id: 14,
        code: "Q14",
        title: "Q14 - Soft Skills vs Hard Skills",
        framework: "C",
        frameworkName: "Agree / Disagree",
        minWords: 450,
        maxWords: 500,
        content: `Time: 60 minutes\n\nWrite an essay of 450–500 words responding to the following question:\n\nSome people argue that soft skills, such as communication and teamwork, are more important than technical knowledge for long-term career success.\n\nTo what extent do you agree or disagree?`,
        quickHints: {
            stance: "Khuyên chọn: Partly agree (Kỹ năng cứng là nền tảng bắt buộc vào nghề, kỹ năng mềm giúp thăng tiến dài lâu)",
            vocab: [
                "interpersonal skills (kỹ năng giao tiếp ứng xử)",
                "technical expertise (chuyên môn kỹ thuật)",
                "career advancement (thăng tiến sự nghiệp)",
                "resolve conflicts (giải quyết xung đột)",
                "non-negotiable foundation (nền tảng bắt buộc)"
            ],
            body1Vi: [
                "Kỹ năng mềm không thể thiếu để phối hợp nhóm, giải quyết xung đột và lên làm quản lý (VD: lập trình viên giỏi code nhưng giao tiếp kém khó lên làm leader)."
            ],
            body2Vi: [
                "Nhưng thiếu chuyên môn kỹ thuật thì không thể làm việc cốt lõi (VD: bác sĩ phẫu thuật thân thiện nhưng thiếu chuyên môn sẽ gây nguy hiểm tính mạng)."
            ]
        },
        stage2Intro: {
            template: "It is often argued that {{1}} play a greater role than {{2}} in achieving career success. I {{3}} with this view, as technical skills are essential to enter a profession, while soft skills are crucial for {{4}}.",
            answers: ["interpersonal skills", "technical expertise", "partly agree", "advancement"],
            distractors: ["hobbies", "physical strength", "unemployment"],
            viTranslation: "Người ta thường cho rằng kỹ năng giao tiếp ứng xử đóng vai trò lớn hơn chuyên môn kỹ thuật trong việc đạt thành công nghề nghiệp. Tôi đồng ý một phần với quan điểm này, vì kỹ năng chuyên môn là thiết yếu để bước vào nghề, còn kỹ năng mềm rất quan trọng để thăng tiến."
        },
        stage3Body1: [
            { role: "Point", en: "Soft skills are indispensable for collaboration and leadership in modern workplaces.", vi: "Kỹ năng mềm không thể thiếu cho sự hợp tác và lãnh đạo nơi công sở hiện đại." },
            { role: "Explain", en: "Most large projects require diverse teams to share ideas, resolve conflicts, and meet deadlines together.", vi: "Phần lớn các dự án lớn đòi hỏi đội ngũ đa dạng cùng chia sẻ ý tưởng, giải quyết mâu thuẫn và kịp tiến độ." },
            { role: "Example", en: "For instance, a brilliant programmer who cannot explain solutions to clients or cooperate with teammates will rarely be promoted to manager.", vi: "Ví dụ, một lập trình viên xuất sắc nhưng không biết trình bày giải pháp cho khách hàng hay hợp tác với đồng đội sẽ hiếm khi lên quản lý." },
            { role: "Link", en: "Therefore, strong communication often separates average employees from top leaders.", vi: "Vì vậy, kỹ năng giao tiếp mạnh thường tạo ra khác biệt giữa nhân viên bình thường và lãnh đạo hàng đầu." }
        ],
        stage4Body2: [
            { role: "Point", vi: "Tuy nhiên, riêng kỹ năng mềm không thể thay thế kiến thức chuyên môn vững chắc.", keywords: ["However", "cannot replace", "technical knowledge"], sample: "However, soft skills alone cannot replace solid technical knowledge." },
            { role: "Explain", vi: "Trong các ngành chuyên sâu như y học, kỹ thuật hay tài chính, nhà tuyển dụng trước hết đánh giá ứng viên có làm chuẩn công việc cốt lõi hay không.", keywords: ["specialised fields", "evaluate", "core job"], sample: "In specialised fields such as medicine, engineering, or finance, employers first evaluate whether a candidate can actually perform the core job accurately." },
            { role: "Example", vi: "Một bác sĩ phẫu thuật thân thiện nhưng thiếu chuyên môn y khoa vững sẽ đặt tính mạng bệnh nhân vào nguy hiểm nghiêm trọng.", keywords: ["friendly surgeon", "medical expertise", "serious risk"], sample: "A friendly surgeon without strong medical expertise would put patients' lives at serious risk." },
            { role: "Link", vi: "Do đó, năng lực chuyên môn vẫn là nền tảng bắt buộc của mọi nghề nghiệp.", keywords: ["Consequently", "technical competence", "non-negotiable foundation"], sample: "Consequently, technical competence remains the non-negotiable foundation of any career." }
        ],
        sampleConclusion: {
            en: "In conclusion, although soft skills are vital for long-term growth and leadership, they are not strictly more important than technical knowledge. True career success requires a balanced combination of both.",
            vi: "Tóm lại, dù kỹ năng mềm thiết yếu cho phát triển dài hạn và lãnh đạo, chúng không hoàn toàn quan trọng hơn kiến thức chuyên môn. Thành công thật sự đòi hỏi sự kết hợp cân bằng cả hai."
        }
    },
    {
        id: 15,
        code: "Q15",
        title: "Q15 - Public Transport",
        framework: "C",
        frameworkName: "Agree / Disagree",
        minWords: 350,
        maxWords: 400,
        content: `Time: 60 minutes\n\nWrite an essay of 350–400 words to answer the following question:\n\nGovernments should invest more money in improving public transportation rather than building new roads for private vehicles.\n\nDo you agree or disagree?`,
        quickHints: {
            stance: "Khuyên chọn: Strongly agree (Giao thông công cộng giải quyết tận gốc kẹt xe, ô nhiễm & công bằng xã hội)",
            vocab: [
                "public transit (giao thông công cộng)",
                "traffic congestion (tắc nghẽn giao thông)",
                "sustainable solution (giải pháp bền vững)",
                "private vehicles (phương tiện cá nhân)",
                "livable cities (thành phố đáng sống)"
            ],
            body1Vi: [
                "Một chuyến tàu điện/xe buýt chở bằng hàng chục ô tô, tốn ít diện tích (VD: Tokyo, Singapore); còn mở rộng đường lại kích thích mua thêm xe."
            ],
            body2Vi: [
                "Giao thông công cộng giúp sinh viên, người già, người thu nhập thấp tiết kiệm chi phí và đi lại công bằng hơn."
            ]
        },
        stage2Intro: {
            template: "It is argued that national budgets should {{1}} upgrading {{2}} instead of constructing more roads for private cars. I {{3}} with this statement because public transport offers more {{4}} solutions to traffic congestion and pollution.",
            answers: ["prioritise", "public transit", "strongly agree", "sustainable"],
            distractors: ["ignore", "luxury yachts", "temporary"],
            viTranslation: "Có ý kiến cho rằng ngân sách quốc gia nên ưu tiên nâng cấp giao thông công cộng thay vì xây thêm đường cho ô tô cá nhân. Tôi hoàn toàn đồng ý với nhận định này vì giao thông công cộng mang lại giải pháp bền vững hơn cho ùn tắc và ô nhiễm."
        },
        stage3Body1: [
            { role: "Point", en: "Firstly, investing in public transport directly reduces traffic jams and air pollution.", vi: "Thứ nhất, đầu tư vào giao thông công cộng trực tiếp giảm ùn tắc và ô nhiễm không khí." },
            { role: "Explain", en: "A single metro train or electric bus can carry as many commuters as dozens of private cars, using far less road space and fuel.", vi: "Một chuyến tàu điện hay xe buýt điện có thể chở lượng hành khách bằng hàng chục ô tô cá nhân, tốn ít diện tích đường và nhiên liệu hơn." },
            { role: "Example", en: "For instance, cities like Tokyo and Singapore maintain smooth traffic flow largely thanks to their reliable rail networks.", vi: "Ví dụ, các thành phố như Tokyo và Singapore duy trì giao thông thông suốt phần lớn nhờ mạng lưới đường sắt đáng tin cậy." },
            { role: "Link", en: "In contrast, building wider roads only encourages more people to buy cars, creating a never-ending cycle of congestion.", vi: "Ngược lại, mở rộng đường chỉ khuyến khích nhiều người mua xe hơn, tạo ra vòng lặp kẹt xe không hồi kết." }
        ],
        stage4Body2: [
            { role: "Point", vi: "Thứ hai, giao thông công cộng dễ tiếp cận giúp giảm chi phí sinh hoạt và thúc đẩy công bằng xã hội.", keywords: ["Secondly", "living costs", "social equality"], sample: "Secondly, accessible public transit lowers living costs and promotes social equality." },
            { role: "Explain", vi: "Sinh viên, người cao tuổi và người thu nhập thấp không đủ tiền mua xe riêng phụ thuộc lớn vào xe buýt và tàu giá rẻ.", keywords: ["elderly citizens", "low-income workers", "affordable buses"], sample: "Students, elderly citizens, and low-income workers who cannot afford private vehicles rely heavily on affordable buses and trains to reach schools and workplaces." },
            { role: "Link", vi: "Vì vậy, rót vốn cho giao thông công cộng mang lại lợi ích cho tỷ lệ dân số rộng lớn hơn so với mở rộng đường bộ.", keywords: ["Therefore", "wider share", "road expansion"], sample: "Therefore, funding public transport benefits a wider share of the population than road expansion." }
        ],
        sampleConclusion: {
            en: "In conclusion, I strongly agree that governments should prioritise public transportation over new roads. Doing so not only protects the environment and eases congestion, but also creates fairer, more livable cities.",
            vi: "Tóm lại, tôi hoàn toàn đồng ý chính phủ nên ưu tiên giao thông công cộng hơn xây đường mới. Làm vậy không chỉ bảo vệ môi trường, giảm kẹt xe mà còn kiến tạo những thành phố công bằng và đáng sống hơn."
        }
    },
    {
        id: 16,
        code: "Q16",
        title: "Q16 - Online vs Traditional Learning",
        framework: "D",
        frameworkName: "Discuss Both Views + Opinion",
        minWords: 450,
        maxWords: 500,
        content: `Time: 60 minutes\n\nWrite an essay of 450–500 words in response to the question below:\n\nSome people believe that online learning is more effective than traditional classroom education, while others argue that face-to-face learning remains superior.\n\nDiscuss both views and give your own opinion.`,
        quickHints: {
            stance: "Khuyên chọn: Blended learning (kết hợp học online linh hoạt với tương tác lớp học trực tiếp)",
            vocab: [
                "unmatched flexibility (sự linh hoạt vượt trội)",
                "at their own pace (theo tốc độ riêng)",
                "face-to-face instruction (giảng dạy trực tiếp)",
                "blended learning (học tập kết hợp)",
                "human connection (kết nối con người)"
            ],
            body1Vi: [
                "View 1 (Online): Học mọi nơi theo tốc độ riêng, tua lại bài giảng, tiết kiệm tiền trọ/đi lại (VD: học lấy bằng qua Coursera)."
            ],
            body2Vi: [
                "View 2 (Lớp truyền thống): Giáo viên kịp nắm bắt khi học sinh mất tập trung, thảo luận nhóm trực tiếp, môn thực hành thí nghiệm/y tế bắt buộc học trực tiếp."
            ]
        },
        stage2Intro: {
            template: "People hold different opinions about whether {{1}} is more effective than {{2}}. This essay will discuss {{3}} before explaining why I believe a {{4}} is the best option.",
            answers: ["online education", "traditional classrooms", "both views", "blended approach"],
            distractors: ["self-study", "textbooks", "single method"],
            viTranslation: "Mọi người có ý kiến khác nhau về việc giáo dục trực tuyến có hiệu quả hơn lớp học truyền thống hay không. Bài viết sẽ thảo luận cả hai quan điểm trước khi giải thích vì sao tôi tin phương pháp kết hợp là lựa chọn tốt nhất."
        },
        stage3Body1: [
            { role: "Point", en: "Those who support online learning argue that it offers unmatched flexibility and cost savings.", vi: "Những người ủng hộ học trực tuyến cho rằng nó mang lại sự linh hoạt vượt trội và tiết kiệm chi phí." },
            { role: "Explain", en: "Students can study from anywhere at their own pace, replay recorded lectures, and avoid commuting or accommodation expenses.", vi: "Sinh viên có thể học ở bất cứ đâu theo tốc độ riêng, xem lại bài giảng ghi hình và tránh chi phí đi lại hay nhà trọ." },
            { role: "Example", en: "For instance, working adults can complete a foreign university degree online via platforms like Coursera without quitting their jobs.", vi: "Ví dụ, người đi làm có thể hoàn thành bằng đại học nước ngoài trực tuyến qua các nền tảng như Coursera mà không phải nghỉ việc." },
            { role: "Link", en: "Therefore, digital learning makes education accessible to millions of learners worldwide.", vi: "Vì vậy, học tập số giúp giáo dục dễ tiếp cận với hàng triệu người học trên toàn cầu." }
        ],
        stage4Body2: [
            { role: "Point", vi: "Mặt khác, người ủng hộ lớp học truyền thống tin rằng giảng dạy trực tiếp xây dựng kỷ luật và tương tác tốt hơn.", keywords: ["On the other hand", "face-to-face instruction", "discipline"], sample: "On the other hand, supporters of traditional classrooms believe that face-to-face instruction builds stronger discipline and interaction." },
            { role: "Explain", vi: "Trong lớp học thực tế, giáo viên nhận ra ngay khi sinh viên khó hiểu hay mất tập trung, còn thảo luận nhóm nuôi dưỡng tình bạn.", keywords: ["physical classroom", "distracted", "group discussions"], sample: "In a physical classroom, teachers can immediately notice when students are confused or distracted, while group discussions foster teamwork and friendships." },
            { role: "Example", vi: "Hơn nữa, các môn thực hành như khoa học thí nghiệm hay chăm sóc sức khỏe không thể thành thạo chỉ qua màn hình.", keywords: ["Moreover", "laboratory sciences", "computer screen"], sample: "Moreover, practical subjects such as laboratory sciences or healthcare cannot be mastered solely through a computer screen." },
            { role: "Link", vi: "Do đó, lớp học trực tiếp mang lại môi trường học phong phú mà công nghệ khó sao chép được.", keywords: ["Thus", "rich learning environment", "replicate"], sample: "Thus, physical classrooms provide a rich learning environment that technology struggles to replicate." }
        ],
        sampleConclusion: {
            en: "In conclusion, both online and traditional learning have distinct strengths. However, in my opinion, combining both methods—known as blended learning—is the most effective path, because it delivers digital flexibility while preserving human connection.",
            vi: "Tóm lại, cả học trực tuyến lẫn truyền thống đều có thế mạnh riêng. Tuy nhiên, theo tôi, kết hợp cả hai phương pháp—gọi là học tập kết hợp (blended learning)—là con đường hiệu quả nhất vì vừa có sự linh hoạt số vừa giữ được kết nối con người."
        }
    },
    {
        id: 17,
        code: "Q17",
        title: "Q17 - Gap Year",
        framework: "D",
        frameworkName: "Discuss Both Views + Opinion",
        minWords: 350,
        maxWords: 400,
        content: `Write an essay of 350–400 words to answer the following question:\n\nSome students choose to take a gap year to work or travel after finishing high school, while others prefer to go directly to university.\n\nDiscuss both these views and give your own opinion.`,
        quickHints: {
            stance: "Khuyên chọn: Gap year có giá trị nếu có kế hoạch rõ ràng; ai đã chắc ngành học thì nên vào thẳng đại học",
            vocab: [
                "gain maturity (trưởng thành hơn)",
                "clarify career goals (làm rõ mục tiêu nghề nghiệp)",
                "academic momentum (đà học tập)",
                "direct enrollment (nhập học trực tiếp)",
                "well-planned (có kế hoạch rõ ràng)"
            ],
            body1Vi: [
                "View 1 (Gap year): Trưởng thành, khám phá sở thích thật, tiết kiệm tiền và tránh chọn sai ngành (VD: đi thực tập 1 năm)."
            ],
            body2Vi: [
                "View 2 (Vào thẳng ĐH): Giữ đà học tập và kiến thức nền, tốt nghiệp và đi làm kiếm thu nhập sớm hơn 1 năm."
            ]
        },
        stage2Intro: {
            template: "People have different views on whether high school graduates should take a {{1}} or enter {{2}} immediately. This essay will examine {{3}} before explaining why I believe a {{4}} gap year can be highly beneficial.",
            answers: ["gap year", "university", "both perspectives", "well-planned"],
            distractors: ["vacation", "retirement", "aimless"],
            viTranslation: "Mọi người có góc nhìn khác nhau về việc học sinh tốt nghiệp cấp ba nên nghỉ một năm (gap year) hay vào thẳng đại học. Bài viết sẽ phân tích cả hai quan điểm trước khi giải thích vì sao tôi tin một năm gap year có kế hoạch rõ ràng có thể rất có ích."
        },
        stage3Body1: [
            { role: "Point", en: "Proponents of taking a gap year argue that it helps young people gain maturity and clarify their career goals.", vi: "Những người ủng hộ gap year cho rằng nó giúp người trẻ trưởng thành hơn và làm rõ mục tiêu nghề nghiệp." },
            { role: "Explain", en: "After twelve years of continuous schooling, working part-time or volunteering allows students to discover their real interests and save money.", vi: "Sau 12 năm học liên tục, đi làm thêm hoặc làm tình nguyện giúp học sinh khám phá sở thích thật và tiết kiệm tiền." },
            { role: "Example", en: "For example, a student who interns at a design studio during a gap year may enter university with much stronger motivation and focus.", vi: "Ví dụ, một học sinh thực tập tại studio thiết kế trong năm gap year có thể bước vào đại học với động lực và sự tập trung mạnh mẽ hơn nhiều." },
            { role: "Link", en: "Therefore, a gap year can prevent students from choosing the wrong major.", vi: "Vì vậy, gap year có thể giúp học sinh tránh chọn sai ngành học." }
        ],
        stage4Body2: [
            { role: "Point", vi: "Mặt khác, nhiều người tin rằng vào thẳng đại học giữ được đà học tập.", keywords: ["On the other hand", "directly", "academic momentum"], sample: "On the other hand, others believe that going straight to university preserves academic momentum." },
            { role: "Explain", vi: "Học sinh vừa tốt nghiệp còn nhớ kiến thức nền và thói quen học, trong khi nghỉ một năm có thể khiến việc quay lại khó khăn hơn.", keywords: ["foundational knowledge", "study habits", "academic routines"], sample: "Fresh high school graduates still remember foundational knowledge and study habits, whereas a year off may make it harder to return to strict academic routines." },
            { role: "Example", vi: "Thêm vào đó, tốt nghiệp sớm một năm giúp người trẻ bước vào thị trường lao động và có thu nhập ổn định sớm hơn.", keywords: ["graduating one year earlier", "job market", "stable income"], sample: "In addition, graduating one year earlier allows young adults to enter the job market and earn a stable income sooner." },
            { role: "Link", vi: "Do đó, nhập học trực tiếp là lộ trình an toàn và nhanh hơn cho những bạn đã biết rõ hướng đi nghề nghiệp.", keywords: ["Consequently", "direct enrollment", "safer"], sample: "Consequently, direct enrollment is a safer and faster route for students who already know their career path." }
        ],
        sampleConclusion: {
            en: "In conclusion, both paths offer clear advantages. In my opinion, taking a gap year is valuable if students have a clear plan, but those who are already confident about their major should go directly to university.",
            vi: "Tóm lại, cả hai con đường đều có lợi ích rõ ràng. Theo tôi, nghỉ một năm gap year rất giá trị nếu có kế hoạch rõ ràng, nhưng ai đã chắc chắn về ngành học thì nên vào thẳng đại học."
        }
    },
    {
        id: 18,
        code: "Q18",
        title: "Q18 - Freelance vs Office Jobs",
        framework: "E",
        frameworkName: "Advantages vs. Disadvantages",
        minWords: 450,
        maxWords: 500,
        content: `Time: 60 minutes\n\nCompose an essay of 450–500 words to address the question below:\n\nAn increasing number of young graduates are choosing freelance work rather than traditional full-time office jobs.\n\nDo the advantages of this trend outweigh the disadvantages?`,
        quickHints: {
            stance: "Khuyên chọn: Advantages outweigh disadvantages (Tự do + thu nhập không giới hạn lớn hơn rủi ro có thể phòng ngừa)",
            vocab: [
                "nine-to-five job (công việc hành chính)",
                "income instability (thu nhập không ổn định)",
                "employee benefits (phúc lợi nhân viên)",
                "emergency savings (quỹ dự phòng)",
                "gig economy (kinh tế tự do)"
            ],
            body1Vi: [
                "Ưu 1: Tự do chọn dự án, tự xếp giờ, làm việc mọi nơi (VD: designer Việt làm cho khách quốc tế).",
                "Ưu 2: Không bị trần lương cứng, làm đa dự án giúp tăng kỹ năng nhanh."
            ],
            body2Vi: [
                "Nhược: Thu nhập bấp bênh, không có bảo hiểm y tế hay nghỉ ốm hưởng lương.",
                "Phản biện Outweigh: Lập quỹ dự phòng, tự mua bảo hiểm và ký hợp đồng dài hạn với khách uy tín."
            ]
        },
        stage2Intro: {
            template: "Nowadays, a rising number of young professionals prefer {{1}} over conventional {{2}} office jobs. Although freelance careers involve certain {{3}}, I believe that the {{4}} outweigh the disadvantages.",
            answers: ["freelancing", "nine-to-five", "risks", "advantages"],
            distractors: ["volunteering", "part-time", "promotions"],
            viTranslation: "Ngày nay, ngày càng nhiều người trẻ đi làm thích làm việc tự do (freelance) hơn các công việc văn phòng hành chính truyền thống. Dù sự nghiệp freelance đi kèm một số rủi ro nhất định, tôi tin rằng ưu điểm vượt trội hơn nhược điểm."
        },
        stage3Body1: [
            { role: "Point 1", en: "The first major advantage of freelancing is freedom and schedule flexibility.", vi: "Ưu điểm lớn đầu tiên của làm freelance là sự tự do và linh hoạt về lịch trình." },
            { role: "Explain + Example", en: "Freelancers can choose which projects to accept, set their own hours, and work from anywhere, such as collaborating with international clients from a coffee shop.", vi: "Freelancer có thể chọn dự án muốn nhận, tự sắp xếp giờ giấc và làm việc từ mọi nơi, như hợp tác với khách hàng quốc tế từ quán cà phê." },
            { role: "Point 2", en: "Another significant benefit is higher income potential and faster skill growth.", vi: "Một lợi ích lớn khác là tiềm năng thu nhập cao hơn và phát triển kỹ năng nhanh hơn." },
            { role: "Explain 2", en: "Instead of relying on a single fixed salary, talented freelancers can serve multiple clients and gain diverse industry experience.", vi: "Thay vì phụ thuộc một mức lương cố định, freelancer giỏi có thể phục vụ nhiều khách hàng và tích lũy kinh nghiệm đa dạng." },
            { role: "Link", en: "These benefits make freelancing especially appealing to ambitious young people.", vi: "Những lợi ích này khiến làm freelance đặc biệt hấp dẫn với giới trẻ nhiều tham vọng." }
        ],
        stage4Body2: [
            { role: "Point", vi: "Phải thừa nhận làm freelance đi kèm những nhược điểm đáng kể, chủ yếu là thu nhập bấp bênh và thiếu phúc lợi nhân viên.", keywords: ["Admittedly", "income instability", "employee benefits"], sample: "Admittedly, freelance work comes with notable drawbacks, mainly income instability and a lack of employee benefits." },
            { role: "Explain", vi: "Khác nhân viên toàn thời gian, freelancer không có ngày nghỉ ốm hưởng lương, bảo hiểm y tế hay lương tháng cố định.", keywords: ["paid sick leave", "health insurance", "paychecks"], sample: "Unlike full-time staff, freelancers do not receive paid sick leave, health insurance, or guaranteed monthly paychecks, which can cause financial stress." },
            { role: "Counter", vi: "Tuy nhiên, thách thức này nhỏ hơn lợi ích vì freelancer có thể xây quỹ dự phòng, tự mua bảo hiểm và ký hợp đồng dài hạn.", keywords: ["However", "emergency savings", "long-term contracts"], sample: "However, these challenges are manageable and less significant than the rewards, because disciplined freelancers can build emergency savings, buy private insurance, and sign long-term contracts with trusted clients." }
        ],
        sampleConclusion: {
            en: "To sum up, despite income uncertainty and limited benefits, the freedom and growth opportunities of freelancing are far more significant. With smart financial planning, young graduates can thrive in the modern gig economy.",
            vi: "Tóm lại, bất chấp thu nhập thiếu ổn định và phúc lợi hạn chế, sự tự do và cơ hội phát triển của nghề freelance vượt trội hơn nhiều. Với kế hoạch tài chính thông minh, sinh viên mới ra trường có thể thành công trong nền kinh tế tự do hiện đại."
        }
    },
    {
        id: 19,
        code: "Q19",
        title: "Q19 - Tourism in Historic Cities",
        framework: "E",
        frameworkName: "Advantages vs. Disadvantages",
        minWords: 350,
        maxWords: 400,
        content: `Time: 60 minutes\n\nWrite an essay of 350–400 words to answer the following question:\n\nThe rapid growth of tourism in historic cities has brought major economic and social changes.\n\nDo the advantages of this trend outweigh the disadvantages?`,
        quickHints: {
            stance: "Khuyên chọn: Benefits outweigh drawbacks nếu quản lý bền vững (giới hạn khách, thu phí bảo tồn)",
            vocab: [
                "booming tourism (du lịch bùng nổ)",
                "cultural preservation (bảo tồn văn hóa)",
                "ancient monuments (di tích cổ)",
                "overcrowding (quá tải người)",
                "sustainable policies (chính sách bền vững)"
            ],
            body1Vi: [
                "Ưu 1: Tăng trưởng kinh tế, việc làm (VD: Hội An thịnh vượng nhờ khách sạn, nhà hàng, thủ công).",
                "Ưu 2: Doanh thu du lịch tài trợ trùng tu di tích cổ & giữ nghề truyền thống."
            ],
            body2Vi: [
                "Nhược: Quá tải, tiếng ồn, rác thải, giá nhà tăng cao.",
                "Phản biện Outweigh: Chính sách bền vững (giới hạn khách/ngày, thu phí bảo tồn, kích cầu trái mùa)."
            ]
        },
        stage2Intro: {
            template: "In recent decades, booming {{1}} has dramatically transformed many {{2}} around the world. While mass tourism creates certain {{3}}, I believe that its overall {{4}} outweigh the drawbacks if managed properly.",
            answers: ["tourism", "historic cities", "challenges", "benefits"],
            distractors: ["factories", "deserts", "failures"],
            viTranslation: "Trong vài thập kỷ qua, du lịch bùng nổ đã thay đổi mạnh mẽ nhiều thành phố lịch sử trên khắp thế giới. Dù du lịch đại chúng tạo ra một số thách thức nhất định, tôi tin rằng lợi ích tổng thể lớn hơn nhược điểm nếu được quản lý hợp lý."
        },
        stage3Body1: [
            { role: "Point 1", en: "The primary advantage of tourism is substantial economic growth for local communities.", vi: "Ưu điểm chính của du lịch là tăng trưởng kinh tế mạnh mẽ cho cộng đồng địa phương." },
            { role: "Explain + Example", en: "Visitors spend money on hotels, restaurants, and handicrafts, creating thousands of jobs, as seen in the prosperity of Hoi An in Vietnam.", vi: "Du khách chi tiền cho khách sạn, nhà hàng và đồ thủ công, tạo hàng nghìn việc làm như sự thịnh vượng của Hội An ở Việt Nam." },
            { role: "Point 2", en: "Another key benefit is cultural preservation and global recognition.", vi: "Một lợi ích quan trọng khác là bảo tồn văn hóa và được thế giới biết đến." },
            { role: "Explain 2", en: "Tourism revenue provides vital funding to restore ancient monuments and keep traditional crafts alive.", vi: "Doanh thu du lịch cung cấp nguồn vốn thiết yếu để trùng tu di tích cổ và giữ gìn nghề thủ công truyền thống." },
            { role: "Link", en: "These gains are essential for keeping historic cities vibrant.", vi: "Những lợi ích này rất quan trọng để giữ cho các thành phố cổ luôn sống động." }
        ],
        stage4Body2: [
            { role: "Point", vi: "Phải thừa nhận du lịch tăng trưởng nhanh có thể gây quá tải người, tăng chi phí sống và hư hại di sản.", keywords: ["Admittedly", "overcrowding", "heritage sites"], sample: "Admittedly, rapid tourism growth can cause overcrowding, rising living costs, and damage to heritage sites." },
            { role: "Explain", vi: "Khi quá đông du khách tràn vào phố nhỏ, người dân địa phương đối mặt với tiếng ồn, rác thải và giá nhà tăng cao.", keywords: ["narrow streets", "noise", "housing prices"], sample: "When too many visitors flood narrow streets, local residents face noise, litter, and higher housing prices." },
            { role: "Counter", vi: "Tuy nhiên, tác động tiêu cực có thể giảm thiểu nhờ chính sách bền vững như giới hạn khách theo ngày và thu phí bảo tồn.", keywords: ["However", "sustainable policies", "conservation fees"], sample: "However, these negative effects can be effectively minimised through sustainable policies, such as limiting daily visitor numbers, charging conservation fees, and promoting off-season travel." }
        ],
        sampleConclusion: {
            en: "To sum up, although mass tourism can strain local infrastructure, its economic and cultural benefits are far more significant. With responsible management, historic cities can welcome the world while protecting their heritage.",
            vi: "Tóm lại, dù du lịch đại chúng có thể gây áp lực lên hạ tầng địa phương, lợi ích kinh tế và văn hóa của nó lớn hơn nhiều. Với sự quản lý có trách nhiệm, các thành phố cổ vừa có thể đón thế giới vừa bảo vệ được di sản."
        }
    },
    {
        id: 20,
        code: "Q20",
        title: "Q20 - Academic Stress & Mental Health",
        framework: "A",
        frameworkName: "Cause + Solution",
        minWords: 350,
        maxWords: 400,
        content: `Writing topic\n\nAcademic pressure and mental health issues among university students have become increasingly serious in recent years. Nevertheless, practical measures can be taken to ease this burden and support student well-being.\n\nWrite an essay (350–400 words) explaining the main causes of academic stress among university students and suggesting effective solutions to address this problem.`,
        quickHints: {
            stance: "Thân 1: Nguyên nhân (lịch học nặng + kỳ vọng/áp lực đồng trang lứa) • Thân 2: Giải pháp (tư vấn học đường + quản lý thời gian)",
            vocab: [
                "student well-being (sức khỏe tinh thần & thể chất)",
                "peer pressure (áp lực đồng trang lứa)",
                "burnout (kiệt sức)",
                "counselling services (dịch vụ tư vấn tâm lý)",
                "time-management skills (kỹ năng quản lý thời gian)"
            ],
            body1Vi: [
                "Point 1: Khối lượng học tập nặng, deadline gấp, thi cử khó khiến sinh viên thức khuya thiếu ngủ.",
                "Point 2: Kỳ vọng cao từ gia đình và áp lực đồng trang lứa trên mạng xã hội dẫn tới burnout."
            ],
            body2Vi: [
                "Point 1: Trường học cung cấp tư vấn tâm lý miễn phí, workshop quản lý stress, phân bổ lịch đánh giá hợp lý.",
                "Point 2: Sinh viên chia nhỏ bài tập, tập thể dục và chia sẻ cởi mở."
            ]
        },
        stage2Intro: {
            template: "In recent years, {{1}} and mental health challenges have become increasingly {{2}} among university students. This essay will examine the key {{3}} of this issue and propose practical {{4}} to improve student well-being.",
            answers: ["academic stress", "widespread", "causes", "solutions"],
            distractors: ["physical fitness", "invisible", "advantages"],
            viTranslation: "Những năm gần đây, áp lực học tập và các vấn đề sức khỏe tinh thần ngày càng lan rộng ở sinh viên đại học. Bài viết sẽ phân tích các nguyên nhân chính của vấn đề này và đề xuất giải pháp thực tế để cải thiện sức khỏe tinh thần cho sinh viên."
        },
        stage3Body1: [
            { role: "Point 1", en: "One major cause of student stress is heavy academic workloads combined with fear of failure.", vi: "Một nguyên nhân chính gây căng thẳng cho sinh viên là khối lượng học tập nặng kết hợp với nỗi sợ thất bại." },
            { role: "Explain", en: "Tight assignment deadlines, difficult exams, and strict grading criteria often force students to stay up late and sacrifice sleep.", vi: "Hạn nộp bài gấp, kỳ thi khó và tiêu chí chấm điểm khắt khe thường buộc sinh viên thức khuya và hy sinh giấc ngủ." },
            { role: "Example", en: "For instance, many undergraduates feel overwhelmed during exam weeks when juggling multiple projects alongside part-time jobs.", vi: "Ví dụ, nhiều sinh viên cảm thấy quá tải trong tuần thi khi phải xoay xở nhiều đồ án cùng với việc làm thêm." },
            { role: "Point 2", en: "Another cause is high expectations from parents and intense peer pressure on social media.", vi: "Một nguyên nhân khác là kỳ vọng cao từ phụ huynh và áp lực đồng trang lứa nặng nề trên mạng xã hội." },
            { role: "Link", en: "As a result, many young people experience burnout, anxiety, and a loss of motivation.", vi: "Kết quả là nhiều bạn trẻ rơi vào kiệt sức, lo âu và mất động lực học tập." }
        ],
        stage4Body2: [
            { role: "Point 1", vi: "Mở rộng hỗ trợ sức khỏe tinh thần dễ tiếp cận ngay tại trường là giải pháp thiết yếu đầu tiên.", keywords: ["mental health support", "on campus", "vital solution"], sample: "Expanding accessible mental health support on campus is the first vital solution." },
            { role: "Explain", vi: "Các trường đại học nên cung cấp dịch vụ tư vấn tâm lý miễn phí và phân bổ lịch đánh giá hợp lý hơn.", keywords: ["counselling services", "stress-management", "assessment schedules"], sample: "Universities should provide free counselling services, stress-management workshops, and more balanced assessment schedules throughout the semester." },
            { role: "Point 2", vi: "Ngoài ra, chính sinh viên cần xây dựng thói quen sinh hoạt lành mạnh và kỹ năng quản lý thời gian.", keywords: ["In addition", "healthy daily routines", "time-management skills"], sample: "In addition, students themselves need to develop healthy daily routines and time-management skills." },
            { role: "Link", vi: "Kết hợp lại, sự hỗ trợ từ nhà trường và khả năng tự chăm sóc có thể bảo vệ sức khỏe tinh thần cho sinh viên.", keywords: ["institutional support", "self-care", "protect"], sample: "Together, institutional support and self-care can protect students' mental health." }
        ],
        sampleConclusion: {
            en: "In conclusion, academic stress among university students stems mainly from heavy workloads and social expectations. However, through campus counselling services and healthier personal habits, universities and students can build a more supportive learning environment.",
            vi: "Tóm lại, áp lực học tập ở sinh viên chủ yếu bắt nguồn từ khối lượng học nặng và kỳ vọng xã hội. Tuy nhiên, nhờ dịch vụ tư vấn học đường và thói quen cá nhân lành mạnh hơn, nhà trường và sinh viên có thể xây dựng môi trường học tập tích cực hơn."
        }
    }
];
