'use client'
import React, { useState } from "react";
import { MaxWidthWrapper } from "../utils/MaxWidthWrapper";
import { Card } from "../utils/Card";
import { TwitterFilled } from "asem-icons";
import { BubbleButton } from "../buttons/BubbleButton";
import { motion } from "motion/react";
import { useWindowSize } from "../utils/useWindowSize";
import { CornerGrid } from "../utils/CornerGrid";
import { SectionHeading } from "../utils/SectionHeading";
import { SectionSubheading } from "../utils/SectionSubheading";
import { SectionHeadingSpacing } from "../utils/SectionHeadingSpacing";

export const Customers = () => {
  const { width } = useWindowSize();
  const [open, setOpen] = useState(false);

  const shouldCollapseColumns = width ? width <= 768 : false;

  return (
    <section id="testimonials" className="relative overflow-hidden">
      <MaxWidthWrapper className="relative z-10 py-20 md:py-40">
        <SectionHeadingSpacing>
          <SectionHeading>Müşterilerimiz Ne Diyor?</SectionHeading>
          <SectionSubheading>
            Gerçek kullanıcı deneyimleri. İşletmeler için tasarlandı, kuyumcular tarafından onaylandı.
          </SectionSubheading>
        </SectionHeadingSpacing>
        <motion.div
          initial={false}
          animate={open ? "open" : "closed"}
          style={{
            overflow: "hidden",
          }}
          variants={{
            open: {
              height: "fit-content",
            },
            closed: {
              height: 400,
            },
          }}
          className="relative grid grid-cols-1 gap-3 md:grid-cols-3"
        >
          {shouldCollapseColumns ? (
            <>
              <ReviewsColumn
                reviews={[...REVIEWS.left, ...REVIEWS.center, ...REVIEWS.right]}
              />
            </>
          ) : (
            <>
              <ReviewsColumn reviews={REVIEWS.left} />
              <ReviewsColumn reviews={REVIEWS.center} />
              <ReviewsColumn reviews={REVIEWS.right} />
            </>
          )}

          <motion.div
            variants={{
              open: {
                top: "100%",
              },
              closed: {
                top: "0%",
              },
            }}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-white/0 to-white"
          />
        </motion.div>
        <BubbleButton
          onClick={() => setOpen((pv) => !pv)}
          className="mx-auto mt-12"
        >
          {open ? "Daha Az Göster" : "Daha Fazla Göster"}
        </BubbleButton>
      </MaxWidthWrapper>
      <CornerGrid />
    </section>
  );
};

const ReviewsColumn = ({ reviews }: { reviews: typeof REVIEWS.left }) => {
  return (
    <div className="h-fit space-y-3">
      {reviews.map((r) => (
        <Card
          style={{
            padding: "20px",
          }}
          key={r.name}
        >
          <div className="mb-1.5 flex items-center justify-between">
            <div className="relative flex items-center gap-2 py-2 text-xs">
              <img
                src={r.src}
                alt={`Placeholder image for faux user ${r.name}`}
                className="size-8 rounded-full"
              />
              <div>
                <span className="block font-medium text-zinc-800">
                  {r.name}
                </span>
                <span className="block text-zinc-500">{r.handle}</span>
              </div>
            </div>

            <TwitterFilled className="text-my-blue" />
          </div>
          <p>{r.review}</p>
        </Card>
      ))}
    </div>
  );
};

const REVIEWS = {
  left: [
    {
      src: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mehmet",
      name: "Mehmet Kaya",
      handle: "@kuyumcu_mehmet",
      review:
        "Altın hesaplamalarım artık çok daha hızlı. Mobil uygulaması sayesinde her yerden takip edebiliyorum. Harika bir platform!",
    },
    {
      src: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ayse",
      name: "Ayşe Demir",
      handle: "@aysealtın",
      review:
        "Canlı fiyat güncellemeleri çok işime yarıyor. Müşterilerime anında fiyat verebiliyorum.",
    },
    {
      src: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ali",
      name: "Ali Yıldız",
      handle: "@aliyildiz_gold",
      review:
        "İşletmem için vazgeçilmez oldu. Raporlama özelliği sayesinde her şeyi takip ediyorum. Kesinlikle tavsiye ederim.",
    },
    {
      src: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatma",
      name: "Fatma Şahin",
      handle: "@fatmakuyumcu",
      review:
        "Çoklu cihaz desteği harika. Hem telefondan hem bilgisayardan rahatça kullanıyorum.",
    },
  ],
  center: [
    {
      src: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mustafa",
      name: "Mustafa Öztürk",
      handle: "@mustafagold",
      review: "Kullanımı çok kolay ve pratik. Ekibim hemen adapte oldu.",
    },
    {
      src: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zeynep",
      name: "Zeynep Arslan",
      handle: "@zeynepaltın",
      review:
        "Destek ekibi çok ilgili. Sorularıma hemen cevap aldım. Platformdan çok memnunum.",
    },
    {
      src: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hasan",
      name: "Hasan Aydın",
      handle: "@hasankuyumcu",
      review:
        "Fiyat hesaplamaları saniyeler içinde yapılıyor. Manuel hesaplamadan kurtuldum.",
    },
    {
      src: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elif",
      name: "Elif Koç",
      handle: "@elifgold",
      review:
        "İşletmemin dijitalleşmesinde büyük rol oynadı. Artık her şey çok daha düzenli.",
    },
  ],
  right: [
    {
      src: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmet",
      name: "Ahmet Çelik",
      handle: "@ahmetkuyumcu",
      review:
        "Güvenlik önlemleri çok iyi. Verilerimin güvende olduğundan eminim. Herkese tavsiye ederim.",
    },
    {
      src: "https://api.dicebear.com/7.x/avataaars/svg?seed=Selin",
      name: "Selin Yılmaz",
      handle: "@selingold",
      review:
        "Paket sistemleri çok uygun fiyatlı. İşletme büyüklüğüme göre paket seçebildim. Harika bir çözüm!",
    },
    {
      src: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emre",
      name: "Emre Kara",
      handle: "@emrealtın",
      review:
        "Raporlama ve analiz özellikleri işimin büyük kısmını kolaylaştırdı. Çok memnunum.",
    },
    {
      src: "https://api.dicebear.com/7.x/avataaars/svg?seed=Derya",
      name: "Derya Polat",
      handle: "@deryakuyumcu",
      review:
        "Kullanıcı dostu arayüz. Teknolojiye uzak olmama rağmen kolayca kullanabiliyorum.",
    },
  ],
};
