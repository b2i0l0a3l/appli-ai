import StatsCard from './statsCard';
import SuggestionSection from './Suggestions';

export default function AiSideBar(){
   
    return (
        <aside className="lg:col-span-4 flex flex-col gap-6">
          <SuggestionSection/>
            <StatsCard/>
        </aside>
    )
}