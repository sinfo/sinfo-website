import { MemberService } from "@/services/MemberService";
import { EventService } from "@/services/EventService";
import MemberCard from "@/components/MemberCard";
import BlankPageMessage from "@/components/BlankPageMessage";

export const dynamic = "force-dynamic";

export default async function TeamPage() {
  const event = await EventService.getLatest();
  const members = event ? await MemberService.getFilteredMembers(event.id) : [];

  if (!members || members.length === 0) {
    return (
      <BlankPageMessage message="No team members found. Please check back later." />
    );
  }

  const sortedMembers = members.slice().sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
  );

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sinfo-primary via-sinfo-primary to-sinfo-secondary py-16 sm:py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Meet Our Team
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              The passionate students behind SINFO, Portugal&apos;s biggest free
              tech conference. We work together to bring innovation and
              knowledge to the tech community.
            </p>
          </div>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats */}
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
                <div className="inline-block bg-white rounded-full px-6 sm:px-8 py-3 sm:py-4 shadow-lg">
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-sinfo-primary">
                {sortedMembers.length}
              </p>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 uppercase tracking-wide">
                Team Members
              </p>
            </div>
          </div>

          {/* Members Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {sortedMembers.map((member) => (
              <MemberCard
                key={member.name}
                name={member.name}
                img={member.img}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
