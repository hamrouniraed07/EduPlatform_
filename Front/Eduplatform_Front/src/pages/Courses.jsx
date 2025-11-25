import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/courses')
      .then(res => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '100px',
        fontSize: '20px',
        color: '#666'
      }}>
        Chargement des cours...
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '40px', 
      maxWidth: '1200px', 
      margin: '0 auto',
      backgroundColor: '#f9f9f9',
      minHeight: 'calc(100vh - 60px)'
    }}>
      <h1 style={{ 
        fontSize: '36px', 
        marginBottom: '30px',
        color: '#2c3e50'
      }}>
        Liste des Cours
      </h1>

      {courses.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px',
          backgroundColor: 'white',
          borderRadius: '10px'
        }}>
          <p style={{ fontSize: '18px', color: '#888' }}>
            Aucun cours disponible pour le moment
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '25px'
        }}>
          {courses.map(course => (
            <div key={course._id} style={{
              padding: '25px',
              backgroundColor: 'white',
              borderRadius: '10px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)';
            }}>
              <h3 style={{ 
                color: '#2c3e50',
                marginBottom: '15px',
                fontSize: '22px'
              }}>
                {course.title}
              </h3>
              
              <p style={{ 
                color: '#666', 
                marginBottom: '15px',
                lineHeight: '1.6'
              }}>
                {course.description.substring(0, 120)}...
              </p>
              
              <div style={{ 
                marginBottom: '15px',
                paddingTop: '15px',
                borderTop: '1px solid #eee'
              }}>
                <p style={{ 
                  fontWeight: 'bold',
                  color: '#555',
                  marginBottom: '5px'
                }}>
                  👨‍🏫 Instructeur: {course.instructor}
                </p>
                <p style={{ color: '#3498db' }}>
                  👥 {course.students.length} étudiants inscrits
                </p>
                {course.level && (
                  <p style={{ 
                    color: '#27ae60',
                    fontSize: '14px',
                    marginTop: '5px'
                  }}>
                    📊 Niveau: {course.level}
                  </p>
                )}
              </div>

              <Link
                to={`/courses/${course._id}`}
                style={{
                  display: 'inline-block',
                  marginTop: '15px',
                  padding: '12px 24px',
                  backgroundColor: '#3498db',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '5px',
                  fontSize: '15px',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}
              >
                Voir détails →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Courses;