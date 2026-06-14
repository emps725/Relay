import Sidebar from "../components/Sidebar";
import UnreadCard from "../components/UnreadCard";
import type { UnreadCardType } from "../types/unreadCard";

function Home() {
  const cards: UnreadCardType[] = [
    {
      id: "1",
      size: "small",
      name: "@challygrim",
      messages: ["knicks won bro", "nyc is done"],
      unreadCount: 2,
    },
    {
      id: "2",
      size: "large",
      name: "Slump",
      messages: [
        "@sebixo: I just beat up my pillows",
        "@flyingline: congratulations",
        "@sebixo: if I can't beat up my pillows I will just walk around like a [REDACTED]",
        "@challygrim: [REDACTED]",
        "@challygrim: INGAME",
      ],
      unreadCount: 42,
    },
    {
      id: "3",
      size: "medium",
      name: "@lorem",
      messages: [
        "Lorem ipsum dolor sit.",
        "Lorem, ipsum.",
        "Lorem ipsum dolor, sit amet consectetur adipisicing.",
        "Lorem",
      ],
      unreadCount: 4,
    },
  ];

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">While you were gone...</h1>

        <div className="columns-2 gap-6">
          {cards.map((card) => (
            <UnreadCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
