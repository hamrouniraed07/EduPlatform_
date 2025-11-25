import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import api from '../api/axios';

function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    
    api.get(`/courses/${id}`)
      .then(res => setCourse(res.data))
      .catch(err => console.error(err));

   
    api.get(`/courses/${id}/reviews`)
      .then(res => {
        setReviews(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      await api.post(`/courses/${id}/enroll`);
      alert(' Inscription réussie !');
      
      const res = await api.get(`/courses/${id}`);
      setCourse(res.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur lors de l\'inscription');
    }
  };

  if (loading || !course) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '100px',
        fontSize: '20px'
      }}>
        Chargement...
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '40px', 
      maxWidth: '900px', 
      margin: '0 auto',
      minHeight: 'calc(100vh - 60px)'
    }}>
      <h1 style={{ 
        fontSize: '42px', 
        marginBottom: '20px',
        color: '#2c3e50'
      }}>
        {course.title}
      </h1>
      
      <p style={{ 
        fontSize: '18px', 
        color: '#666', 
        marginBottom: '30px',
        lineHeight: '1.8'
      }}>
        {course.description}
      </p>

      <div style={{
        padding: '25px',
        backgroundColor: '#f8f9fa',
        borderRadius: '10px',
        marginBottom: '30px'
      }}>
        <p style={{ marginBottom: '12px', fontSize: '16px' }}>
          <strong>👨‍🏫 Instructeur:</strong> {course.instructor}
        </p>
        <p style={{ marginBottom: '12px', fontSize: '16px' }}>
          <strong>👥 Étudiants inscrits:</strong> {course.students.length}
        </p>
        {course.level && (
          <p style={{ marginBottom: '12px', fontSize: '16px' }}>
            <strong>📊 Niveau:</strong> {course.level}
          </p>
        )}
        {course.duration && (
          <p style={{ fontSize: '16px' }}>
            <strong>⏱️ Durée:</strong> {course.duration} heures
          </p>
        )}
      </div>

      <button
        onClick={handleEnroll}
        style={{
          padding: '15px 40px',
          backgroundColor: '#27ae60',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '18px',
          fontWeight: 'bold',
          boxShadow: '0 4px 10px rgba(39, 174, 96, 0.3)',
          transition: 'all 0.3s'
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#229954';
          e.target.style.transform = 'translateY(-2px)';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#27ae60';
          e.target.style.transform = 'translateY(0)';
        }}
      >
        🎓 S'inscrire au cours
      </button>

      <h2 style={{ 
        marginTop: '60px', 
        marginBottom: '25px',
        fontSize: '32px',
        color: '#2c3e50'
      }}>
        ⭐ Avis des étudiants
      </h2>

      {reviews.length === 0 ? (
        <p style={{ 
          color: '#999',
          fontSize: '16px',
          fontStyle: 'italic'
        }}>
          Aucun avis pour le moment. Soyez le premier à donner votre avis !
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {reviews.map(review => (
            <div key={review._id} style={{
              padding: '20px',
              backgroundColor: 'white',
              borderRadius: '8px',
              border: '1px solid #e0e0e0',
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
            }}>
              <div style={{ 
                color: '#f39c12', 
                fontSize: '20px',
                marginBottom: '10px'
              }}>
                {'⭐'.repeat(review.rating)}
              </div>
              <p style={{ 
                marginBottom: '10px',
                fontSize: '16px',
                lineHeight: '1.6',
                color: '#444'
              }}>
                {review.comment}
              </p>
              <p style={{ 
                fontSize: '14px',
                color: '#888'
              }}>
                — {review.user?.username || 'Utilisateur'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CourseDetails;