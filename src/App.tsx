import { observer } from 'mobx-react';
import * as moment from 'moment';
import * as React from 'react';

import CalendarCard from './components/CalendarCard';
import ControlWindow from './components/ControlWindow';
import { IPerson } from './interfaces/IPerson';
import appStore from './store/AppStore';

import './App.css';

const mockUser: IPerson = {
  address: "Москва",
  averageBill: "500 eur",
  birthdate: moment({ year: 1971, month: 10, day: 21 }),
  friends: ["Ален Евсеев", "Дарья Акодимишена", "Виктор Дёмин"],
  id: "#001",
  invitedBy: "Ален Евсеев",
  name: "Алексей",
  patronymic: "",
  phone: "+37128481181",
  rate: 20,
  surname: "Долматов"
};

@observer
class App extends React.Component {
  constructor(props: React.Props<any>) {
    super(props);

    appStore.updateCurrentUser(appStore.currentUser || mockUser);

    if (appStore.calendarDays.length === 0) appStore.loadDay(moment());
  }

  public render() {
    return (
      <div>
        {typeof window !== "undefined" && window.document ? (
          <ControlWindow appStore={appStore} />
        ) : null}
        <CalendarCard
          days={appStore.calendarDays}
          daysPending={appStore.calendarDaysPending}
          requestCallback={appStore.loadDay}
          positionCount={appStore.positionCount}
          dayTimeRange={appStore.dayTimeRange}
        />
      </div>
      // <BioCard
      //   personData={{
      //     target: appStore.currentUser as IPerson,
      //     update: arr => appStore.updateCurrentUserProp(arr)
      //   }}
      // />
    );
  }
}

export default App;
