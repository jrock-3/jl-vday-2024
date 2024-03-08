import { useState, useEffect, useMemo } from 'react'
import './App.css'
import { getReasonIdx, getUnlockTime, reasons, timeDiffStr } from './util/utils';
import { MOST_RECENT_REASON_INDEX_LOCAL_STORAGE_KEY, MS_BETWEEN_REASONS, NEXT_REASON_UNLOCK_DATETIME_LOCAL_STORAGE_KEY } from './util/constants';

const App = () => {
  // Local Storage Vars
  const [reasonIdx, setReasonIdx] = useState<number>(getReasonIdx);
  const [unlockTime, setUnlockTime] = useState<number>(getUnlockTime);

  // Current Vars
  const [currTime, setCurrTime] = useState<number>(() => new Date().getTime());
  const [currIdx, setCurrIdx] = useState<number>(getReasonIdx);

  const timeString = useMemo<string>(() => timeDiffStr(currTime, unlockTime), [currTime, unlockTime]);

  // Memoized Bounds Checks
  const canUnlock = useMemo<boolean>(() => Math.floor(unlockTime / 1000) <= Math.floor(currTime / 1000), [unlockTime, currTime]);
  const canDecrease = useMemo<boolean>(() => currIdx > 0, [currIdx]);
  const canIncrease = useMemo<boolean>(() => {
    const isWithinBounds: boolean = currIdx < reasonIdx;
    const isAtMax: boolean = currIdx === reasonIdx;
    return isWithinBounds || isAtMax && canUnlock;
  }, [currIdx, reasonIdx, canUnlock]);

  // Sets client-side timer
  useEffect(() => {
    const id = setInterval(() => setCurrTime(new Date().getTime()), 1000);
    return () => clearInterval(id);
  }, []);

  // Handle index logic
  const changeOffset = (num: number) => {
    setCurrIdx(prev => {
      const res: number = Math.min(prev + num, reasons.length);
      if (res > reasonIdx) {
        localStorage.setItem(MOST_RECENT_REASON_INDEX_LOCAL_STORAGE_KEY, res.toString());
        setReasonIdx(res);

        const newUnlockTime: number = new Date().getTime() + MS_BETWEEN_REASONS;
        localStorage.setItem(NEXT_REASON_UNLOCK_DATETIME_LOCAL_STORAGE_KEY, newUnlockTime.toString());
        setUnlockTime(newUnlockTime);
      }
      return res;
    });
  };

  return (
    <>
      <h1>Reason #{currIdx + 1}</h1>
      <h1>why Justin Loves Jennifer</h1>
      <p>Next message unlocks {canUnlock ? "Now!" : `in ${timeString}`}</p>
      <>
        <button disabled={!canDecrease} onClick={() => changeOffset(-1)}>←</button>
        <button disabled={!canIncrease} onClick={() => changeOffset(+1)}>→</button>
      </>
      <h2>I love {reasons[currIdx]}</h2>
    </>
  )
};

export default App;
