import { configureStore } from '@reduxjs/toolkit';
import taskSlice from './taskSlice';
import groupOneSlice from './groupOneSlice';
import groupTwoSlice from './groupTwoSlice';
import groupThreeSlice from './groupThreeSlice';
import groupFourSlice from './groupFourSlice';

export default configureStore({
  reducer: {
    tasks: taskSlice,
    groupOne: groupOneSlice,
    groupTwo: groupTwoSlice,
    groupThree: groupThreeSlice,
    groupFour: groupFourSlice,
  }
})