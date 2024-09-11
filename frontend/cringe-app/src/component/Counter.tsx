import { useEffect, useState } from 'react';
import '../style/counter.css';
import { PlayerDisplay } from './PlayerDisplay';
import { Button } from './Button';
import Fetcher, { Person } from '../api/Fetcher';

export default function Counter() {
  const [willPoint, setWillPoints] = useState<number>(0);
  const [samPoint, setSamPoint] = useState<number>(0);
  const [willBPoint, setWillBPoint] = useState<number>(0);
  const [pointFor, setPointFor] = useState<number>(0);
  const [name, setName] = useState<string>("Sam");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const errorText: string = "Can't go below zero";

  useEffect(() => {
    async function fetchInitialPoints() {
      const persons: Person[] = await Fetcher.getInstance().getAllPersons();
      persons.forEach(person => {
        if (person.name === "Sam") setSamPoint(person.pts);
        if (person.name === "Will L") setWillPoints(person.pts);
        if (person.name === "Will B") setWillBPoint(person.pts);
      });
    }
    fetchInitialPoints();
  }, []);

  const addPoint = async () => {
    setErrorMessage(null);
    switch (pointFor) {
      case 0:
        setSamPoint(prevSamPoint => {
          const newPoints = prevSamPoint + 1;
          Fetcher.getInstance().createOrUpdatePerson({ name: "Sam", pts: newPoints });
          return newPoints;
        });
        break;
      case 1:
        setWillPoints(prevWillPoints => {
          const newPoints = prevWillPoints + 1;
          Fetcher.getInstance().createOrUpdatePerson({ name: "Will L", pts: newPoints });
          return newPoints;
        });
        break;
      case 2:
        setWillBPoint(prevWillBPoints => {
          const newPoints = prevWillBPoints + 1;
          Fetcher.getInstance().createOrUpdatePerson({ name: "Will B", pts: newPoints });
          return newPoints;
        });
        break;
    }
  };

  const delPoint = async () => {
    setErrorMessage(null);
    switch (pointFor) {
      case 0:
        if (samPoint > 0) {
          setSamPoint(prevSamPoints => {
            const newPoints = prevSamPoints - 1;
            Fetcher.getInstance().createOrUpdatePerson({ name: "Sam", pts: newPoints });
            return newPoints;
          });
        } else {
          setErrorMessage(errorText);
        }
        break;
      case 1:
        if (willPoint > 0) {
          setWillPoints(prevWillPoints => {
            const newPoints = prevWillPoints - 1;
            Fetcher.getInstance().createOrUpdatePerson({ name: "Will L", pts: newPoints });
            return newPoints;
          });
        } else {
          setErrorMessage(errorText);
        }
        break;
      case 2:
        if (willBPoint > 0) {
          setWillBPoint(prevWillBPoints => {
            const newPoints = prevWillBPoints - 1;
            Fetcher.getInstance().createOrUpdatePerson({ name: "Will B", pts: newPoints });
            return newPoints;
          });
        } else {
          setErrorMessage(errorText);
        }
        break;
    }
  };

  const changePlayerPoint = () => {
    setPointFor(prevPointFor => {
      const newPointFor = (prevPointFor + 1) % 3;
      switch (newPointFor) {
        case 0:
          setName("Sam");
          break;
        case 1:
          setName("Will L");
          break;
        case 2:
          setName("Will B");
          break;
      }
      return newPointFor;
    });
  };

  return (
    <div>
      <div className='container'>
        <PlayerDisplay playerName='Sam' playerPoint={samPoint} />
        <PlayerDisplay playerName='Will L' playerPoint={willPoint} />
        <PlayerDisplay playerName='Will B' playerPoint={willBPoint} />
      </div>
      <Button addPoint={addPoint} delPoint={delPoint} changePlayerPoint={changePlayerPoint} name={name} />
      {errorMessage && <p className='errordisplay'>{errorMessage}</p>}
    </div>
  );
}
