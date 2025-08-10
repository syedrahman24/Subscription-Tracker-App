import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  query, 
  where,
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';

// Collection name for subscriptions
const COLLECTION_NAME = 'subscriptions';

// Add a new subscription
export const addSubscription = async (userId, subscriptionData) => {
  try {
    console.log('Adding subscription for user:', userId, subscriptionData);
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...subscriptionData,
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    console.log('Subscription added successfully with ID:', docRef.id);
    return { id: docRef.id, ...subscriptionData };
  } catch (error) {
    console.error('Error adding subscription:', error);
    throw error;
  }
};

// Get all subscriptions for a user
export const getSubscriptions = async (userId) => {
  try {
    console.log('Fetching subscriptions for user:', userId);
    
    // First, try to get all documents without filtering to test permissions
    const testQuery = query(collection(db, COLLECTION_NAME));
    console.log('Testing basic query...');
    
    try {
      const testSnapshot = await getDocs(testQuery);
      console.log('Basic query successful, found', testSnapshot.size, 'total documents');
    } catch (testError) {
      console.error('Basic query failed:', testError);
    }
    
    // Now try the actual user-specific query (simplified to avoid index requirement)
    const q = query(
      collection(db, COLLECTION_NAME),
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(q);
    const subscriptions = [];
    
    querySnapshot.forEach((doc) => {
      subscriptions.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate?.() || new Date()
      });
    });
    
    console.log('Fetched subscriptions:', subscriptions);
    return subscriptions;
  } catch (error) {
    console.error('Error getting subscriptions:', error);
    console.error('Error details:', error.message, error.code);
    throw error;
  }
};

// Update a subscription
export const updateSubscription = async (subscriptionId, updatedData) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, subscriptionId);
    await updateDoc(docRef, {
      ...updatedData,
      updatedAt: serverTimestamp()
    });
    return { id: subscriptionId, ...updatedData };
  } catch (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }
};

// Delete a subscription
export const deleteSubscription = async (subscriptionId) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, subscriptionId);
    await deleteDoc(docRef);
    return subscriptionId;
  } catch (error) {
    console.error('Error deleting subscription:', error);
    throw error;
  }
};

// Get subscription statistics for a user
export const getSubscriptionStats = async (userId) => {
  try {
    const subscriptions = await getSubscriptions(userId);
    
    const totalMonthlySpend = subscriptions.reduce((total, sub) => {
      const monthlyCost = sub.billingFrequency === 'yearly' ? sub.cost / 12 : sub.cost;
      return total + monthlyCost;
    }, 0);
    
    const categoryBreakdown = subscriptions.reduce((acc, sub) => {
      const monthlyCost = sub.billingFrequency === 'yearly' ? sub.cost / 12 : sub.cost;
      acc[sub.category] = (acc[sub.category] || 0) + monthlyCost;
      return acc;
    }, {});
    
    return {
      totalSubscriptions: subscriptions.length,
      totalMonthlySpend,
      categoryBreakdown
    };
  } catch (error) {
    console.error('Error getting subscription stats:', error);
    throw error;
  }
}; 