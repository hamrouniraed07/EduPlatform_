import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import api from '../api/axios';

function Profile() {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      api.get(`/users/${user.id}/courses`)
        .then(res => {
          setEnrolledCourses(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  return (
    <div style={{ 
      padding: '40px', 
      maxWidth: '1000px', 
      margin: '0 auto',
      minHeight: 'calc(100vh - 60px)',
      backgroundColor: '#f9f9f9'
    }}>
      <h1 style={{ 
        fontSize: '36px', 
        marginBottom: '30px',
        color: '#2c3e50'
      }}>
        👤 Mon Profil
      </h1>

      <div style={{
        padding: '30px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        marginBottom: '40px'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <p style={{ 
            fontSize: '18px',
            color: '#555',
            marginBottom: '10px'
          }}>
            <strong style={{ color: '#2c3e50' }}>Nom d'utilisateur:</strong> {user.username}
          </p>
          <p style={{ 
            fontSize: '18px',
            color: '#555'
          }}>
            <strong style={{ color: '#2c3e50' }}>Email:</strong> {user.email}
          </p>
        </div>

        <div style={{
          paddingTop: '20px',
          borderTop: '1px solid #eee'
        }}>
          <p style={{ 
            fontSize: '16px',
            color: '#888'
          }}>
            📅 Membre depuis {new Date().toLocaleDateString('fr-FR')}
          </p>
        </div>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '25px'
      }}>
        <h2 style={{ 
          fontSize: '28px',
          color: '#2c3e50'
        }}>
          📚 Mes Cours
        </h2>
        <Link 
          to="/courses"
          style={{
            padding: '10px 20px',
            backgroundColor: '#3498db',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          + Parcourir les cours
        </Link>
      </div>

      {loading ? (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          backgroundColor: 'white',
          borderRadius: '10px'
        }}>
          Chargement de vos cours...
        </div>
      ) : enrolledCourses.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px',
          backgroundColor: 'white',
          borderRadius: '10px'
        }}>
          <p style={{ 
            fontSize: '18px',
            color: '#888',
            marginBottom: '20px'
          }}>
            Vous n'êtes inscrit à aucun cours pour le moment
          </p>
          <Link
            to="/courses"
            style={{
              padding: '12px 30px',
              backgroundColor: '#3498db',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            Découvrir les cours
          </Link>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {enrolledCourses.map(course => (
            <div key={course._id} style={{
              padding: '20px',
              backgroundColor: 'white',
              borderRadius: '8px',
              border: '1px solid #e0e0e0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
            }}>
              <h4 style={{ 
                fontSize: '20px',
                marginBottom: '10px',
                color: '#2c3e50'
              }}>
                {course.title}
              </h4>
              <p style={{ 
                fontSize: '14px', 
                color: '#666',
                marginBottom: '12px'
              }}>
                👨‍🏫 {course.instructor}
              </p>
              {course.level && (
                <p style={{ 
                  fontSize: '14px',
                  color: '#27ae60',
                  marginBottom: '15px'
                }}>
                  📊 {course.level}
                </p>
              )}
              <Link
                to={`/courses/${course._id}`}
                style={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  backgroundColor: '#ecf0f1',
                  color: '#2c3e50',
                  textDecoration: 'none',
                  borderRadius: '5px',
                  fontSize: '14px',
                  transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#d5dbdb'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#ecf0f1'}
              >
                Voir le cours →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;