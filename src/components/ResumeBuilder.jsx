import React, { useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import Select from "react-select";
import html2pdf from "html2pdf.js";

const ResumeBuilder = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [education, setEducation] = useState([
    { institute: "", year: "", degree: "" },
  ]);
  const [experience, setExperience] = useState([
    { company: "", year: "", designation: "" },
  ]);
  const [skills, setSkills] = useState([]);

  const [selectedSkill, setSelectedSkill] = useState(null);
  const skillOptions = [
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "React", label: "React" },
    { value: "Angular", label: "Angular" },
    { value: "Vue.js", label: "Vue.js" },
    { value: "Node.js", label: "Node.js" },
    { value: "Python", label: "Python" },
    { value: "Java", label: "Java" },
    { value: "C++", label: "C++" },
    { value: "C#", label: "C#" },
    { value: "Ruby", label: "Ruby" },
    { value: "SQL", label: "SQL" },
    { value: "Git", label: "Git" },
    { value: "PHP", label: "PHP" },
    { value: "JavaScript", label: "JavaScript" },
  ];

  const [newSkill, setNewSkill] = useState("");

  const resumeRef = useRef();

  const handleAddEducation = () => {
    setEducation([...education, { institute: "", year: "", degree: "" }]);
  };

  const handleAddExperience = () => {
    setExperience([...experience, { company: "", year: "", designation: "" }]);
  };

  const handleAddSkill = () => {
    if (selectedSkill && selectedSkill.value) {
      setSkills([...skills, selectedSkill.value]);
      setSelectedSkill(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const resumeElement = resumeRef.current;
    const opt = {
      margin: 0,
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 4 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(resumeElement).save();
  };

  return (
    <div className="container card">
      <div className="card-body">
        <Form onSubmit={handleSubmit}>
          <h3>Personal Information</h3>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <textarea
              className="form-control"
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>

          <h3>Education</h3>
          {education.map((edu, index) => (
            <div key={index}>
              <Form.Group controlId={`education[${index}].institute`}>
                <Form.Label>Institute</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter institute name"
                  value={edu.institute}
                  onChange={(e) => {
                    const updatedEducation = [...education];
                    updatedEducation[index].institute = e.target.value;
                    setEducation(updatedEducation);
                  }}
                />
              </Form.Group>

              <Form.Group controlId={`education[${index}].year`}>
                <Form.Label>Year of Passing</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter year"
                  value={edu.year}
                  onChange={(e) => {
                    const updatedEducation = [...education];
                    updatedEducation[index].year = e.target.value;
                    setEducation(updatedEducation);
                  }}
                />
              </Form.Group>

              <Form.Group controlId={`education[${index}].degree`}>
                <Form.Label>Degree</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter degree"
                  value={edu.degree}
                  onChange={(e) => {
                    const updatedEducation = [...education];
                    updatedEducation[index].degree = e.target.value;
                    setEducation(updatedEducation);
                  }}
                />
              </Form.Group>
            </div>
          ))}
          <Button variant="primary" onClick={handleAddEducation}>
            Add Education
          </Button>

          <h3>Experience</h3>
          {experience.map((exp, index) => (
            <div key={index}>
              <Form.Group controlId={`experience[${index}].company`}>
                <Form.Label>Company</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter company name"
                  value={exp.company}
                  onChange={(e) => {
                    const updatedExperience = [...experience];
                    updatedExperience[index].company = e.target.value;
                    setExperience(updatedExperience);
                  }}
                />
              </Form.Group>

              <Form.Group controlId={`experience[${index}].year`}>
                <Form.Label>Year</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter year"
                  value={exp.year}
                  onChange={(e) => {
                    const updatedExperience = [...experience];
                    updatedExperience[index].year = e.target.value;
                    setExperience(updatedExperience);
                  }}
                />
              </Form.Group>

              <Form.Group controlId={`experience[${index}].designation`}>
                <Form.Label>Designation</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter designation"
                  value={exp.designation}
                  onChange={(e) => {
                    const updatedExperience = [...experience];
                    updatedExperience[index].designation = e.target.value;
                    setExperience(updatedExperience);
                  }}
                />
              </Form.Group>
            </div>
          ))}
          <Button variant="primary" onClick={handleAddExperience}>
            Add Experience
          </Button>

          <h3>Skills</h3>
          <Form.Group controlId="skills">
            <Select
              isClearable
              placeholder="Enter a skill"
              value={selectedSkill}
              options={skillOptions}
              onChange={(selectedOption) => setSelectedSkill(selectedOption)}
            />
            <Button variant="primary" onClick={handleAddSkill}>
              Add Skill
            </Button>
            <ul>
              {skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </Form.Group>

          <Button variant="success" type="submit">
            Generate PDF
          </Button>
        </Form>
      </div>

      <h2 className="text-center lead">Resume preview</h2>
      <div className="container-preview card">
        <div className="card-body" ref={resumeRef}>
          <div className="card-header text-right">
            <h2>{name}</h2>
            <p>{email}</p>
            <p>{address}</p>
            <p>{phone}</p>
          </div>
          <div className="card-body">
            <h4>Education</h4>
            {education.map((edu, index) => (
              <div key={index}>
                <p>
                  {edu.institute} - {edu.year}
                </p>
                <p>{edu.degree}</p>
              </div>
            ))}

            <h4>Experience</h4>
            {experience.map((exp, index) => (
              <div key={index}>
                <p>
                  {exp.company} - {exp.year}
                </p>
                <p>{exp.designation}</p>
              </div>
            ))}

            <h4>Skills</h4>
            <ul>
              {skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
