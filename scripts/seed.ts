import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Comprehensive courses with enhanced pedagogical content
const courses = [
  // ==========================================
  // ALGEBRA FOUNDATIONS (Grade 9-10 - Canadian Curriculum)
  // Common areas where students struggle
  // ==========================================
  {
    title: 'Algebra Foundations: Master the Basics',
    description: 'A comprehensive course designed for Canadian Grade 9-10 students covering the essential algebra concepts that form the foundation for all higher mathematics. Addresses common misconceptions and provides step-by-step problem-solving strategies.',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=450&fit=crop',
    category: 'Mathematics',
    difficulty: 'Beginner',
    duration: '12 hours',
    lessons: [
      {
        title: 'Understanding Variables and Expressions',
        order: 1,
        videoUrl: 'https://www.youtube.com/embed/Tm98lnrlbMA',
        content: `<h2>🎯 Learning Objectives</h2>
<p>By the end of this lesson, you will be able to:</p>
<ul>
  <li>Understand what variables represent and why we use them</li>
  <li>Translate word problems into algebraic expressions</li>
  <li>Evaluate expressions by substituting values</li>
  <li>Identify common mistakes and avoid them</li>
</ul>

<h2>📚 What is a Variable?</h2>
<p>A <strong>variable</strong> is a letter (like x, y, or n) that represents an unknown or changing value. Think of it as a "placeholder" for a number we don't know yet.</p>

<h3>🌍 Real-World Connection</h3>
<p>Variables are everywhere! When you see a price tag that says "Cost = $5 × number of items," the "number of items" is a variable. In math, we'd write:</p>
<pre><code>C = 5n</code></pre>
<p>where C is the total cost and n is the number of items.</p>

<h2>📝 Algebraic Expressions</h2>
<p>An <strong>algebraic expression</strong> combines numbers, variables, and operations (+, −, ×, ÷).</p>

<h3>Examples:</h3>
<table>
  <tr><th>Expression</th><th>In Words</th></tr>
  <tr><td>3x + 5</td><td>Three times a number plus five</td></tr>
  <tr><td>2(n - 4)</td><td>Two times the quantity of a number minus four</td></tr>
  <tr><td>x² + 7</td><td>A number squared plus seven</td></tr>
  <tr><td>y/2 - 3</td><td>A number divided by two, minus three</td></tr>
</table>

<h2>✏️ Worked Example: Translating Words to Algebra</h2>
<p><strong>Problem:</strong> "Sarah is 5 years older than twice her brother's age. If her brother is 'b' years old, write an expression for Sarah's age."</p>

<p><strong>Step-by-step solution:</strong></p>
<ol>
  <li>Identify the variable: b = brother's age</li>
  <li>"Twice her brother's age" means: 2b</li>
  <li>"5 years older than" means: add 5</li>
  <li>Sarah's age = <strong>2b + 5</strong></li>
</ol>

<h2>🔢 Evaluating Expressions</h2>
<p>To <strong>evaluate</strong> an expression, substitute the given value for the variable and calculate.</p>

<h3>Example:</h3>
<p>Evaluate 3x² - 2x + 1 when x = 4</p>
<ol>
  <li>Substitute: 3(4)² - 2(4) + 1</li>
  <li>Exponents first: 3(16) - 2(4) + 1</li>
  <li>Multiply: 48 - 8 + 1</li>
  <li>Add/Subtract: <strong>41</strong></li>
</ol>

<h2>⚠️ Common Mistakes to Avoid</h2>
<div style="background: #fee; padding: 15px; border-radius: 8px; margin: 10px 0;">
  <h4 style="color: #c00;">Mistake #1: Confusing 2x with x²</h4>
  <p>2x means "2 times x" → If x = 3, then 2x = 6</p>
  <p>x² means "x times x" → If x = 3, then x² = 9</p>
</div>

<div style="background: #fee; padding: 15px; border-radius: 8px; margin: 10px 0;">
  <h4 style="color: #c00;">Mistake #2: Forgetting order of operations</h4>
  <p>Always follow BEDMAS/PEMDAS: Brackets, Exponents, Division/Multiplication, Addition/Subtraction</p>
</div>

<h2>🎯 Practice Problems</h2>
<p><strong>Try these on paper, then check your answers:</strong></p>
<ol>
  <li>Write an expression: "A number decreased by 7, then multiplied by 3"</li>
  <li>Evaluate 5x - 3 when x = 4</li>
  <li>Evaluate 2x² + x - 1 when x = -2</li>
</ol>

<details>
  <summary><strong>Click to see answers</strong></summary>
  <ol>
    <li>3(n - 7) or 3n - 21</li>
    <li>5(4) - 3 = 20 - 3 = 17</li>
    <li>2(-2)² + (-2) - 1 = 2(4) - 2 - 1 = 8 - 2 - 1 = 5</li>
  </ol>
</details>`
      },
      {
        title: 'Solving Linear Equations: Step-by-Step',
        order: 2,
        videoUrl: 'https://www.youtube.com/embed/Qyd_v3DGzTM',
        content: `<h2>🎯 Learning Objectives</h2>
<ul>
  <li>Understand the concept of equality and balance</li>
  <li>Solve one-step, two-step, and multi-step equations</li>
  <li>Handle equations with variables on both sides</li>
  <li>Check your solutions</li>
</ul>

<h2>⚖️ The Balance Principle</h2>
<p>An equation is like a balance scale. Whatever you do to one side, you <strong>must</strong> do to the other side to keep it balanced.</p>

<p style="text-align: center; font-size: 24px; padding: 20px; background: #e8f4f8; border-radius: 8px;">
  <strong>Golden Rule: Do unto one side as you do unto the other!</strong>
</p>

<h2>📝 One-Step Equations</h2>
<h3>Example 1: Addition/Subtraction</h3>
<p>Solve: x + 7 = 12</p>
<pre><code>x + 7 = 12
x + 7 - 7 = 12 - 7    (Subtract 7 from both sides)
x = 5</code></pre>
<p><strong>Check:</strong> 5 + 7 = 12 ✓</p>

<h3>Example 2: Multiplication/Division</h3>
<p>Solve: 3x = 18</p>
<pre><code>3x = 18
3x ÷ 3 = 18 ÷ 3    (Divide both sides by 3)
x = 6</code></pre>
<p><strong>Check:</strong> 3(6) = 18 ✓</p>

<h2>📝 Two-Step Equations</h2>
<p><strong>Strategy:</strong> Undo operations in reverse order (addition/subtraction first, then multiplication/division).</p>

<h3>Worked Example:</h3>
<p>Solve: 2x + 5 = 13</p>
<pre><code>Step 1: Subtract 5 from both sides
2x + 5 - 5 = 13 - 5
2x = 8

Step 2: Divide both sides by 2
2x ÷ 2 = 8 ÷ 2
x = 4</code></pre>
<p><strong>Check:</strong> 2(4) + 5 = 8 + 5 = 13 ✓</p>

<h2>📝 Variables on Both Sides</h2>
<p>Solve: 5x - 3 = 2x + 9</p>
<pre><code>Step 1: Get all x terms on one side
5x - 3 - 2x = 2x + 9 - 2x
3x - 3 = 9

Step 2: Solve the two-step equation
3x - 3 + 3 = 9 + 3
3x = 12
x = 4</code></pre>
<p><strong>Check:</strong> 5(4) - 3 = 17 and 2(4) + 9 = 17 ✓</p>

<h2>🌍 Real-World Application</h2>
<div style="background: #e8f4e8; padding: 15px; border-radius: 8px;">
  <h4>Problem: Cell Phone Plan</h4>
  <p>A phone plan costs $25/month plus $0.10 per text message. If your bill was $37, how many texts did you send?</p>
  
  <p><strong>Set up the equation:</strong></p>
  <pre><code>25 + 0.10t = 37
0.10t = 12
t = 120 texts</code></pre>
</div>

<h2>⚠️ Common Mistakes</h2>
<div style="background: #fee; padding: 15px; border-radius: 8px; margin: 10px 0;">
  <h4 style="color: #c00;">Mistake: Forgetting to apply operations to BOTH sides</h4>
  <p>Wrong: 2x + 5 = 13 → 2x = 8 (forgot to subtract 5 from right side)</p>
  <p>Correct: 2x + 5 = 13 → 2x + 5 - 5 = 13 - 5 → 2x = 8</p>
</div>

<div style="background: #fee; padding: 15px; border-radius: 8px; margin: 10px 0;">
  <h4 style="color: #c00;">Mistake: Sign errors with negatives</h4>
  <p>Be extra careful with negative numbers!</p>
  <p>-3x = 15 → x = 15 ÷ (-3) = -5 (not 5!)</p>
</div>

<h2>🎯 Practice Problems</h2>
<ol>
  <li>x - 9 = 14</li>
  <li>4x + 7 = 31</li>
  <li>3x - 5 = x + 11</li>
  <li>2(x + 3) = 14</li>
</ol>

<details>
  <summary><strong>Click to see answers</strong></summary>
  <ol>
    <li>x = 23</li>
    <li>x = 6</li>
    <li>x = 8</li>
    <li>x = 4</li>
  </ol>
</details>`
      },
      {
        title: 'Working with Fractions in Algebra',
        order: 3,
        videoUrl: 'https://www.youtube.com/embed/8NjtQ0H_qfo',
        content: `<h2>🎯 Learning Objectives</h2>
<ul>
  <li>Add, subtract, multiply, and divide algebraic fractions</li>
  <li>Solve equations containing fractions</li>
  <li>Understand the "multiply by LCD" technique</li>
  <li>Simplify expressions with fractions</li>
</ul>

<h2>😰 Why Fractions Feel Hard</h2>
<p>Many students struggle with fractions because they learned procedural rules without understanding WHY they work. Let's fix that!</p>

<h2>📚 Review: Fraction Operations</h2>

<h3>Adding/Subtracting Fractions</h3>
<p>You need a <strong>common denominator</strong>:</p>
<pre><code>1/2 + 1/3 = ?

Find LCD: 6
Convert: 3/6 + 2/6 = 5/6</code></pre>

<h3>Multiplying Fractions</h3>
<p>Multiply straight across:</p>
<pre><code>2/3 × 4/5 = 8/15</code></pre>

<h3>Dividing Fractions</h3>
<p>Flip the second fraction and multiply:</p>
<pre><code>2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6</code></pre>

<h2>✨ The "Clear the Fractions" Method</h2>
<p>For equations with fractions, multiply EVERYTHING by the LCD to eliminate fractions!</p>

<h3>Worked Example:</h3>
<p>Solve: x/2 + x/3 = 5</p>
<pre><code>Step 1: Find LCD of 2 and 3 → LCD = 6

Step 2: Multiply every term by 6
6(x/2) + 6(x/3) = 6(5)
3x + 2x = 30
5x = 30
x = 6</code></pre>
<p><strong>Check:</strong> 6/2 + 6/3 = 3 + 2 = 5 ✓</p>

<h3>Another Example:</h3>
<p>Solve: (x-1)/4 = (x+2)/3</p>
<pre><code>Step 1: LCD = 12

Step 2: Multiply both sides by 12
12 × (x-1)/4 = 12 × (x+2)/3
3(x-1) = 4(x+2)
3x - 3 = 4x + 8
3x - 4x = 8 + 3
-x = 11
x = -11</code></pre>

<h2>🌍 Real-World Application</h2>
<div style="background: #e8f4e8; padding: 15px; border-radius: 8px;">
  <h4>Problem: Working Together</h4>
  <p>Alex can paint a room in 6 hours. Jordan can paint it in 4 hours. How long to paint together?</p>
  
  <p><strong>Key insight:</strong> In 1 hour, Alex does 1/6 of the job, Jordan does 1/4.</p>
  <pre><code>Together in 1 hour: 1/6 + 1/4 = 2/12 + 3/12 = 5/12

If they complete 5/12 per hour, time for full job:
12/5 = 2.4 hours (2 hours 24 minutes)</code></pre>
</div>

<h2>⚠️ Common Mistakes</h2>
<div style="background: #fee; padding: 15px; border-radius: 8px; margin: 10px 0;">
  <h4 style="color: #c00;">Mistake: Adding numerators AND denominators</h4>
  <p>Wrong: 1/2 + 1/3 = 2/5 ❌</p>
  <p>Correct: 1/2 + 1/3 = 3/6 + 2/6 = 5/6 ✓</p>
</div>

<div style="background: #fee; padding: 15px; border-radius: 8px; margin: 10px 0;">
  <h4 style="color: #c00;">Mistake: Not distributing when multiplying by LCD</h4>
  <p>When you have 6(x-1)/4, you must distribute:</p>
  <p>6(x-1)/4 = 6x/4 - 6/4 = 3x/2 - 3/2 (or just simplify to 3(x-1)/2)</p>
</div>

<h2>🎯 Practice Problems</h2>
<ol>
  <li>Simplify: 2/3x + 1/4x</li>
  <li>Solve: x/5 = 3</li>
  <li>Solve: x/2 - x/4 = 3</li>
  <li>Solve: (2x+1)/3 = 5</li>
</ol>

<details>
  <summary><strong>Click to see answers</strong></summary>
  <ol>
    <li>8x/12 + 3x/12 = 11x/12</li>
    <li>x = 15</li>
    <li>x = 12</li>
    <li>x = 7</li>
  </ol>
</details>`
      },
      {
        title: 'Graphing Linear Equations',
        order: 4,
        videoUrl: 'https://www.youtube.com/embed/MXV65i9g1Xg',
        content: `<h2>🎯 Learning Objectives</h2>
<ul>
  <li>Understand the coordinate plane</li>
  <li>Plot points and graph linear equations</li>
  <li>Understand slope and y-intercept</li>
  <li>Convert between different forms of linear equations</li>
</ul>

<h2>📊 The Coordinate Plane</h2>
<p>The coordinate plane is like a city map. Every point has an "address" written as (x, y):</p>
<ul>
  <li><strong>x</strong> = horizontal position (left/right)</li>
  <li><strong>y</strong> = vertical position (up/down)</li>
</ul>

<h2>📈 Slope-Intercept Form: y = mx + b</h2>
<p>This is the most useful form for graphing!</p>
<ul>
  <li><strong>m</strong> = slope (steepness) = rise/run = "how many up for each step right"</li>
  <li><strong>b</strong> = y-intercept = where the line crosses the y-axis</li>
</ul>

<h3>Understanding Slope</h3>
<table>
  <tr><th>Slope Value</th><th>Line Direction</th><th>Example</th></tr>
  <tr><td>Positive (m > 0)</td><td>Goes upward ↗</td><td>m = 2: up 2, right 1</td></tr>
  <tr><td>Negative (m < 0)</td><td>Goes downward ↘</td><td>m = -3: down 3, right 1</td></tr>
  <tr><td>Zero (m = 0)</td><td>Horizontal line —</td><td>y = 5 (flat line)</td></tr>
  <tr><td>Undefined</td><td>Vertical line |</td><td>x = 3 (straight up)</td></tr>
</table>

<h3>📝 Graphing Example: y = 2x - 3</h3>
<ol>
  <li>Identify: m = 2, b = -3</li>
  <li>Plot y-intercept: Start at (0, -3)</li>
  <li>Use slope: From (0, -3), go up 2, right 1 → (1, -1)</li>
  <li>Repeat: up 2, right 1 → (2, 1)</li>
  <li>Connect the dots with a straight line</li>
</ol>

<h2>🔄 Finding Slope from Two Points</h2>
<p style="background: #e8f4f8; padding: 15px; border-radius: 8px; text-align: center; font-size: 20px;">
  <strong>m = (y₂ - y₁) / (x₂ - x₁)</strong>
</p>

<h3>Example:</h3>
<p>Find slope between (2, 3) and (5, 9)</p>
<pre><code>m = (9 - 3) / (5 - 2)
m = 6 / 3
m = 2</code></pre>

<h2>🌍 Real-World Application</h2>
<div style="background: #e8f4e8; padding: 15px; border-radius: 8px;">
  <h4>Problem: Phone Plan</h4>
  <p>A phone plan costs $20/month plus $0.05 per minute. Write and graph the equation.</p>
  
  <p><strong>Equation:</strong> C = 0.05m + 20</p>
  <ul>
    <li>y-intercept (20): The base cost with 0 minutes</li>
    <li>Slope (0.05): Each minute adds $0.05</li>
  </ul>
  
  <p><strong>At 100 minutes:</strong> C = 0.05(100) + 20 = $25</p>
  <p><strong>At 200 minutes:</strong> C = 0.05(200) + 20 = $30</p>
</div>

<h2>⚠️ Common Mistakes</h2>
<div style="background: #fee; padding: 15px; border-radius: 8px; margin: 10px 0;">
  <h4 style="color: #c00;">Mistake: Mixing up slope direction</h4>
  <p>For y = -2x + 1, the negative slope means DOWN not up!</p>
  <p>From (0, 1): down 2, right 1 → (1, -1)</p>
</div>

<div style="background: #fee; padding: 15px; border-radius: 8px; margin: 10px 0;">
  <h4 style="color: #c00;">Mistake: Wrong order in slope formula</h4>
  <p>Always use: (y₂ - y₁) / (x₂ - x₁)</p>
  <p>Not: (x₂ - x₁) / (y₂ - y₁)</p>
</div>

<h2>🎯 Practice Problems</h2>
<ol>
  <li>Graph y = 3x - 2</li>
  <li>Find the slope between (-1, 4) and (3, -8)</li>
  <li>Write equation with slope 4 and y-intercept -1</li>
  <li>What is the slope of y = 7? What about x = 5?</li>
</ol>

<details>
  <summary><strong>Click to see answers</strong></summary>
  <ol>
    <li>Start at (0, -2), go up 3 right 1</li>
    <li>m = (-8 - 4)/(3 - (-1)) = -12/4 = -3</li>
    <li>y = 4x - 1</li>
    <li>y = 7 has slope 0; x = 5 has undefined slope</li>
  </ol>
</details>`
      },
      {
        title: 'Systems of Linear Equations',
        order: 5,
        videoUrl: 'https://www.youtube.com/embed/oKqtgz2fvoE',
        content: `<h2>🎯 Learning Objectives</h2>
<ul>
  <li>Understand what a system of equations represents</li>
  <li>Solve systems using graphing, substitution, and elimination</li>
  <li>Identify when systems have no solution or infinite solutions</li>
  <li>Apply systems to real-world problems</li>
</ul>

<h2>🤔 What is a System of Equations?</h2>
<p>A <strong>system</strong> is two or more equations with the same variables. The solution is the point(s) where ALL equations are true simultaneously.</p>

<p>Graphically: The solution is where the lines intersect!</p>

<h2>Method 1: Graphing</h2>
<p>Graph both equations and find the intersection point.</p>

<h3>Example:</h3>
<pre><code>y = 2x + 1
y = -x + 4

Graph both lines:
- Line 1: starts at (0,1), slope 2
- Line 2: starts at (0,4), slope -1

They intersect at (1, 3)
Check: 2(1) + 1 = 3 ✓ and -1 + 4 = 3 ✓</code></pre>

<h2>Method 2: Substitution</h2>
<p>Solve one equation for a variable, then substitute into the other.</p>

<h3>Worked Example:</h3>
<pre><code>y = 3x - 5    ... (1)
2x + y = 10   ... (2)

Step 1: Equation (1) is already solved for y

Step 2: Substitute into equation (2)
2x + (3x - 5) = 10
5x - 5 = 10
5x = 15
x = 3

Step 3: Find y using equation (1)
y = 3(3) - 5 = 4

Solution: (3, 4)</code></pre>

<h2>Method 3: Elimination</h2>
<p>Add or subtract equations to eliminate one variable.</p>

<h3>Worked Example:</h3>
<pre><code>3x + 2y = 16   ... (1)
5x - 2y = 8    ... (2)

Notice: +2y and -2y will cancel!

Add equations:
3x + 2y = 16
5x - 2y = 8
-----------
8x = 24
x = 3

Substitute back: 3(3) + 2y = 16
9 + 2y = 16
2y = 7
y = 3.5

Solution: (3, 3.5)</code></pre>

<h2>🌍 Real-World Application</h2>
<div style="background: #e8f4e8; padding: 15px; border-radius: 8px;">
  <h4>Problem: Movie Tickets</h4>
  <p>Adult tickets cost $12, children's tickets cost $8. A group bought 7 tickets for $68. How many of each?</p>
  
  <pre><code>Let a = adult tickets, c = children tickets

Equation 1 (total tickets): a + c = 7
Equation 2 (total cost): 12a + 8c = 68

From equation 1: a = 7 - c
Substitute: 12(7 - c) + 8c = 68
84 - 12c + 8c = 68
-4c = -16
c = 4 children, a = 3 adults</code></pre>
</div>

<h2>Special Cases</h2>
<table>
  <tr><th>Case</th><th>Graphically</th><th>Algebraically</th></tr>
  <tr><td>One solution</td><td>Lines intersect</td><td>Get specific values</td></tr>
  <tr><td>No solution</td><td>Parallel lines</td><td>Get false statement (0 = 5)</td></tr>
  <tr><td>Infinite solutions</td><td>Same line</td><td>Get true statement (0 = 0)</td></tr>
</table>

<h2>🎯 Practice Problems</h2>
<ol>
  <li>Solve by substitution: y = x + 2 and 3x + y = 10</li>
  <li>Solve by elimination: 2x + 3y = 12 and 2x - y = 4</li>
  <li>A store sells pens for $2 and notebooks for $5. If someone buys 8 items for $25, how many of each?</li>
</ol>

<details>
  <summary><strong>Click to see answers</strong></summary>
  <ol>
    <li>x = 2, y = 4</li>
    <li>x = 3, y = 2</li>
    <li>5 pens, 3 notebooks</li>
  </ol>
</details>`
      },
      {
        title: 'Polynomials and Factoring',
        order: 6,
        videoUrl: 'https://www.youtube.com/embed/AMEau9OE6Bs',
        content: `<h2>🎯 Learning Objectives</h2>
<ul>
  <li>Understand polynomial terminology</li>
  <li>Add, subtract, and multiply polynomials</li>
  <li>Factor common factors, differences of squares, and trinomials</li>
  <li>Apply factoring to solve equations</li>
</ul>

<h2>📚 Polynomial Vocabulary</h2>
<ul>
  <li><strong>Polynomial:</strong> Expression with terms like 3x² + 2x - 5</li>
  <li><strong>Term:</strong> Parts separated by + or - (e.g., 3x²)</li>
  <li><strong>Coefficient:</strong> The number in front (e.g., 3 in 3x²)</li>
  <li><strong>Degree:</strong> Highest exponent (e.g., 2 in 3x² + 2x)</li>
</ul>

<h3>Types of Polynomials:</h3>
<table>
  <tr><th>Name</th><th>Terms</th><th>Example</th></tr>
  <tr><td>Monomial</td><td>1</td><td>5x³</td></tr>
  <tr><td>Binomial</td><td>2</td><td>x² + 3</td></tr>
  <tr><td>Trinomial</td><td>3</td><td>x² + 5x + 6</td></tr>
</table>

<h2>✖️ Multiplying Polynomials (FOIL)</h2>
<p>FOIL: First, Outer, Inner, Last</p>

<h3>Example: (x + 3)(x + 5)</h3>
<pre><code>F: x · x = x²
O: x · 5 = 5x
I: 3 · x = 3x
L: 3 · 5 = 15

Result: x² + 5x + 3x + 15 = x² + 8x + 15</code></pre>

<h2>📦 Factoring: The Reverse of Multiplying</h2>

<h3>Method 1: Greatest Common Factor (GCF)</h3>
<pre><code>6x² + 9x = 3x(2x + 3)</code></pre>

<h3>Method 2: Difference of Squares</h3>
<p>a² - b² = (a + b)(a - b)</p>
<pre><code>x² - 16 = x² - 4² = (x + 4)(x - 4)
9x² - 25 = (3x)² - 5² = (3x + 5)(3x - 5)</code></pre>

<h3>Method 3: Factoring Trinomials (x² + bx + c)</h3>
<p>Find two numbers that multiply to c and add to b.</p>

<h4>Example: x² + 7x + 12</h4>
<pre><code>Need: two numbers that multiply to 12, add to 7
Factors of 12: 1×12, 2×6, 3×4
Which pair adds to 7? 3 + 4 = 7 ✓

Answer: (x + 3)(x + 4)

Check: (x + 3)(x + 4) = x² + 4x + 3x + 12 = x² + 7x + 12 ✓</code></pre>

<h4>Example with negatives: x² - 5x + 6</h4>
<pre><code>Need: multiply to +6, add to -5
Both numbers must be negative!
-2 × -3 = 6, -2 + -3 = -5 ✓

Answer: (x - 2)(x - 3)</code></pre>

<h2>🔧 Using Factoring to Solve Equations</h2>
<p><strong>Zero Product Property:</strong> If AB = 0, then A = 0 or B = 0</p>

<h3>Example: x² + 5x + 6 = 0</h3>
<pre><code>Factor: (x + 2)(x + 3) = 0

Either x + 2 = 0 → x = -2
Or x + 3 = 0 → x = -3

Solutions: x = -2 or x = -3</code></pre>

<h2>⚠️ Common Mistakes</h2>
<div style="background: #fee; padding: 15px; border-radius: 8px; margin: 10px 0;">
  <h4 style="color: #c00;">Mistake: Forgetting to set equation to zero first</h4>
  <p>Wrong: x² = 5x → x = 5</p>
  <p>Correct: x² - 5x = 0 → x(x - 5) = 0 → x = 0 or x = 5</p>
</div>

<h2>🎯 Practice Problems</h2>
<ol>
  <li>Multiply: (x + 4)(x - 2)</li>
  <li>Factor: x² - 9</li>
  <li>Factor: x² + 8x + 15</li>
  <li>Solve: x² - x - 12 = 0</li>
</ol>

<details>
  <summary><strong>Click to see answers</strong></summary>
  <ol>
    <li>x² + 2x - 8</li>
    <li>(x + 3)(x - 3)</li>
    <li>(x + 3)(x + 5)</li>
    <li>x = 4 or x = -3</li>
  </ol>
</details>`
      }
    ],
    quizQuestions: [
      { text: 'What does the variable x represent in an equation?', options: ['Always the number 10', 'A fixed constant', 'An unknown value', 'A multiplication symbol'], correctIndex: 2 },
      { text: 'Solve: 3x + 7 = 22', options: ['x = 5', 'x = 15', 'x = 3', 'x = 9.67'], correctIndex: 0 },
      { text: 'What is the slope in y = -4x + 3?', options: ['3', '-4', '4', '-3'], correctIndex: 1 },
      { text: 'Factor: x² - 25', options: ['(x - 5)(x - 5)', '(x + 5)(x - 5)', '(x + 25)(x - 1)', 'Cannot be factored'], correctIndex: 1 },
      { text: 'If a line has slope 0, it is:', options: ['Vertical', 'Horizontal', 'Diagonal upward', 'Diagonal downward'], correctIndex: 1 },
      { text: 'Solve: x/3 + 2 = 5', options: ['x = 1', 'x = 9', 'x = 21', 'x = 3'], correctIndex: 1 },
      { text: 'What is the y-intercept in y = 2x - 7?', options: ['2', '7', '-7', '-2'], correctIndex: 2 },
      { text: 'Factor: x² + 7x + 10', options: ['(x + 2)(x + 5)', '(x + 1)(x + 10)', '(x - 2)(x - 5)', '(x + 7)(x + 10)'], correctIndex: 0 }
    ]
  },
  // ==========================================
  // FUNCTIONS & PRE-CALCULUS (Grade 11-12/College)
  // ==========================================
  {
    title: 'Functions & Pre-Calculus: Bridge to Higher Math',
    description: 'Essential course for Grade 11-12 and first-year college students. Master functions, transformations, and prepare for calculus. Addresses the most common areas where students struggle.',
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&h=450&fit=crop',
    category: 'Mathematics',
    difficulty: 'Intermediate',
    duration: '15 hours',
    lessons: [
      {
        title: 'Function Notation and Evaluation',
        order: 1,
        videoUrl: 'https://www.youtube.com/embed/kvGsIo1TmsM',
        content: `<h2>🎯 Learning Objectives</h2>
<ul>
  <li>Understand what a function is and why we use function notation</li>
  <li>Evaluate functions for given inputs</li>
  <li>Find the domain and range of functions</li>
  <li>Determine if a relation is a function</li>
</ul>

<h2>🤔 What is a Function?</h2>
<p>A <strong>function</strong> is a rule that assigns exactly ONE output to each input.</p>

<p style="background: #e8f4f8; padding: 20px; border-radius: 8px; text-align: center; font-size: 18px;">
  Think of a function as a <strong>machine</strong>: you put in a number, the machine does something to it, and out comes exactly one result.
</p>

<h3>Function Notation: f(x)</h3>
<p>Instead of y = 2x + 3, we write <strong>f(x) = 2x + 3</strong></p>
<ul>
  <li>f is the name of the function</li>
  <li>x is the input variable</li>
  <li>f(x) is the output (read as "f of x")</li>
</ul>

<h2>📝 Evaluating Functions</h2>
<p>To find f(3), substitute 3 everywhere you see x.</p>

<h3>Example: If f(x) = x² - 4x + 1, find:</h3>

<p><strong>a) f(2)</strong></p>
<pre><code>f(2) = (2)² - 4(2) + 1
     = 4 - 8 + 1
     = -3</code></pre>

<p><strong>b) f(-1)</strong></p>
<pre><code>f(-1) = (-1)² - 4(-1) + 1
      = 1 + 4 + 1
      = 6</code></pre>

<p><strong>c) f(a + 1)</strong></p>
<pre><code>f(a + 1) = (a + 1)² - 4(a + 1) + 1
         = a² + 2a + 1 - 4a - 4 + 1
         = a² - 2a - 2</code></pre>

<h2>🎭 Domain and Range</h2>
<ul>
  <li><strong>Domain:</strong> All possible INPUT values (x-values)</li>
  <li><strong>Range:</strong> All possible OUTPUT values (y-values)</li>
</ul>

<h3>Finding Domain Restrictions:</h3>
<table>
  <tr><th>Function Type</th><th>Restriction</th><th>Example</th></tr>
  <tr><td>Fraction</td><td>Denominator ≠ 0</td><td>f(x) = 1/(x-3), domain: x ≠ 3</td></tr>
  <tr><td>Square root</td><td>Inside ≥ 0</td><td>f(x) = √(x-2), domain: x ≥ 2</td></tr>
  <tr><td>Polynomial</td><td>No restriction</td><td>f(x) = x³, domain: all real numbers</td></tr>
</table>

<h2>✅ Is it a Function? (Vertical Line Test)</h2>
<p>A graph represents a function if every vertical line crosses it <strong>at most once</strong>.</p>
<ul>
  <li>Circle: NOT a function (vertical line hits twice)</li>
  <li>Parabola opening up/down: IS a function</li>
  <li>Parabola opening left/right: NOT a function</li>
</ul>

<h2>⚠️ Common Mistakes</h2>
<div style="background: #fee; padding: 15px; border-radius: 8px; margin: 10px 0;">
  <h4 style="color: #c00;">Mistake: Confusing f(x) with f × x</h4>
  <p>f(x) does NOT mean f times x!</p>
  <p>f(x) = x² means "f of x equals x squared"</p>
</div>

<div style="background: #fee; padding: 15px; border-radius: 8px; margin: 10px 0;">
  <h4 style="color: #c00;">Mistake: Forgetting parentheses when substituting</h4>
  <p>If f(x) = x² and you want f(-3):</p>
  <p>Wrong: -3² = -9</p>
  <p>Correct: (-3)² = 9</p>
</div>

<h2>🎯 Practice Problems</h2>
<ol>
  <li>If f(x) = 3x - 7, find f(5)</li>
  <li>If g(x) = x² + 2x, find g(-3)</li>
  <li>Find the domain of h(x) = √(x + 4)</li>
  <li>Find the domain of k(x) = 1/(x² - 9)</li>
</ol>

<details>
  <summary><strong>Click to see answers</strong></summary>
  <ol>
    <li>f(5) = 3(5) - 7 = 8</li>
    <li>g(-3) = 9 - 6 = 3</li>
    <li>x + 4 ≥ 0, so x ≥ -4</li>
    <li>x² - 9 ≠ 0, so x ≠ ±3</li>
  </ol>
</details>`
      },
      {
        title: 'Function Transformations',
        order: 2,
        videoUrl: 'https://www.youtube.com/embed/DLPKiMD_ZLw',
        content: `<h2>🎯 Learning Objectives</h2>
<ul>
  <li>Understand how to transform parent functions</li>
  <li>Apply vertical and horizontal shifts</li>
  <li>Apply stretches, compressions, and reflections</li>
  <li>Combine multiple transformations</li>
</ul>

<h2>📚 Parent Functions</h2>
<p>Parent functions are the simplest form of function families:</p>
<table>
  <tr><th>Name</th><th>Equation</th><th>Shape</th></tr>
  <tr><td>Linear</td><td>f(x) = x</td><td>Straight line through origin</td></tr>
  <tr><td>Quadratic</td><td>f(x) = x²</td><td>U-shaped parabola</td></tr>
  <tr><td>Absolute Value</td><td>f(x) = |x|</td><td>V-shape</td></tr>
  <tr><td>Square Root</td><td>f(x) = √x</td><td>Half parabola</td></tr>
  <tr><td>Cubic</td><td>f(x) = x³</td><td>S-curve</td></tr>
</table>

<h2>🔄 Transformation Rules</h2>
<p>Starting with parent function f(x), we transform to: <strong>a·f(b(x - h)) + k</strong></p>

<table>
  <tr><th>Parameter</th><th>Effect</th><th>Example</th></tr>
  <tr><td>+k (outside)</td><td>Shift UP k units</td><td>x² + 3 shifts up 3</td></tr>
  <tr><td>-k (outside)</td><td>Shift DOWN k units</td><td>x² - 2 shifts down 2</td></tr>
  <tr><td>-h (inside)</td><td>Shift RIGHT h units</td><td>(x - 4)² shifts right 4</td></tr>
  <tr><td>+h (inside)</td><td>Shift LEFT h units</td><td>(x + 3)² shifts left 3</td></tr>
  <tr><td>a > 1</td><td>Vertical STRETCH</td><td>2x² is narrower</td></tr>
  <tr><td>0 < a < 1</td><td>Vertical COMPRESSION</td><td>0.5x² is wider</td></tr>
  <tr><td>a < 0</td><td>Reflection over x-axis</td><td>-x² opens downward</td></tr>
</table>

<h3>⚠️ Inside vs Outside Rule</h3>
<p style="background: #ffe; padding: 15px; border-radius: 8px;">
  <strong>Memory trick:</strong><br>
  • Changes INSIDE parentheses affect x (horizontal) and work OPPOSITE<br>
  • Changes OUTSIDE parentheses affect y (vertical) and work DIRECTLY
</p>

<h2>📝 Worked Example</h2>
<p>Describe the transformations: g(x) = -2(x + 3)² - 4</p>

<p>Starting with f(x) = x²:</p>
<ol>
  <li><strong>(x + 3)</strong> → Shift LEFT 3 (opposite of +3)</li>
  <li><strong>× 2</strong> → Vertical stretch by factor 2 (narrower)</li>
  <li><strong>Negative</strong> → Reflection over x-axis (opens down)</li>
  <li><strong>- 4</strong> → Shift DOWN 4</li>
</ol>

<p><strong>Vertex:</strong> (-3, -4)</p>

<h2>🌍 Real-World Application</h2>
<div style="background: #e8f4e8; padding: 15px; border-radius: 8px;">
  <h4>Problem: Projectile Motion</h4>
  <p>A ball thrown from a 10-meter platform follows h(t) = -5t² + 20t + 10</p>
  
  <p>Compared to basic h(t) = -5t²:</p>
  <ul>
    <li>+20t shifts the vertex horizontally</li>
    <li>+10 shifts the whole parabola up 10 (initial height)</li>
    <li>The -5 shows it opens downward (gravity pulls down)</li>
  </ul>
</div>

<h2>🎯 Practice Problems</h2>
<ol>
  <li>Describe transformations: f(x) = (x - 2)² + 5</li>
  <li>Write the equation for x² shifted left 4 and down 1</li>
  <li>If f(x) = √x, write g(x) for √x reflected over x-axis and shifted up 3</li>
</ol>

<details>
  <summary><strong>Click to see answers</strong></summary>
  <ol>
    <li>Right 2, up 5. Vertex at (2, 5)</li>
    <li>(x + 4)² - 1</li>
    <li>g(x) = -√x + 3</li>
  </ol>
</details>`
      },
      {
        title: 'Quadratic Functions in Depth',
        order: 3,
        videoUrl: 'https://www.youtube.com/embed/IlNAJl36-10',
        content: `<h2>🎯 Learning Objectives</h2>
<ul>
  <li>Master the three forms of quadratic equations</li>
  <li>Find vertex, axis of symmetry, and intercepts</li>
  <li>Use the discriminant to analyze solutions</li>
  <li>Solve real-world optimization problems</li>
</ul>

<h2>📋 Three Forms of Quadratic Equations</h2>

<h3>1. Standard Form: f(x) = ax² + bx + c</h3>
<ul>
  <li>Easy to find y-intercept: c</li>
  <li>Vertex formula: x = -b/(2a)</li>
  <li>Opens up if a > 0, down if a < 0</li>
</ul>

<h3>2. Vertex Form: f(x) = a(x - h)² + k</h3>
<ul>
  <li>Vertex is (h, k)</li>
  <li>Easiest form for graphing</li>
  <li>Same 'a' affects direction and stretch</li>
</ul>

<h3>3. Factored Form: f(x) = a(x - r₁)(x - r₂)</h3>
<ul>
  <li>x-intercepts (roots) are r₁ and r₂</li>
  <li>Easiest for finding zeros</li>
</ul>

<h2>🔢 The Quadratic Formula</h2>
<p style="background: #e8f4f8; padding: 20px; border-radius: 8px; text-align: center; font-size: 22px;">
  x = (-b ± √(b² - 4ac)) / (2a)
</p>

<h3>The Discriminant: D = b² - 4ac</h3>
<table>
  <tr><th>If D > 0</th><td>Two distinct real roots</td><td>Parabola crosses x-axis twice</td></tr>
  <tr><th>If D = 0</th><td>One repeated real root</td><td>Parabola touches x-axis once</td></tr>
  <tr><th>If D < 0</th><td>No real roots</td><td>Parabola doesn't cross x-axis</td></tr>
</table>

<h2>📝 Worked Example: Complete Analysis</h2>
<p>Analyze f(x) = 2x² - 8x + 6</p>

<pre><code>a = 2, b = -8, c = 6

1. Direction: a > 0, opens UPWARD

2. Vertex: x = -(-8)/(2·2) = 8/4 = 2
   y = 2(2)² - 8(2) + 6 = 8 - 16 + 6 = -2
   Vertex: (2, -2)

3. y-intercept: f(0) = 6, point (0, 6)

4. x-intercepts: 2x² - 8x + 6 = 0
   x² - 4x + 3 = 0
   (x - 1)(x - 3) = 0
   x = 1 or x = 3

5. Axis of symmetry: x = 2</code></pre>

<h2>🌍 Optimization Problems</h2>
<div style="background: #e8f4e8; padding: 15px; border-radius: 8px;">
  <h4>Problem: Maximum Area</h4>
  <p>You have 100m of fencing to create a rectangular garden. What dimensions maximize the area?</p>
  
  <pre><code>Let width = x, then length = (100 - 2x)/2 = 50 - x

Area = x(50 - x) = 50x - x² = -x² + 50x

This is a parabola opening DOWN, so vertex is maximum.

Vertex x = -50/(2·-1) = 25

Width = 25m, Length = 25m
Maximum area = 625 m²</code></pre>
</div>

<h2>⚠️ Common Mistakes</h2>
<div style="background: #fee; padding: 15px; border-radius: 8px; margin: 10px 0;">
  <h4 style="color: #c00;">Mistake: Sign error in quadratic formula</h4>
  <p>The formula is -b ± √..., not b ± √...</p>
  <p>If b = -6, then -b = 6 (positive!)</p>
</div>

<h2>🎯 Practice Problems</h2>
<ol>
  <li>Find the vertex of f(x) = x² - 6x + 5</li>
  <li>Use the discriminant: x² + 4x + 5 = 0</li>
  <li>Solve using quadratic formula: 2x² - 3x - 2 = 0</li>
</ol>

<details>
  <summary><strong>Click to see answers</strong></summary>
  <ol>
    <li>x = 3, y = -4, vertex (3, -4)</li>
    <li>D = 16 - 20 = -4 < 0, no real solutions</li>
    <li>x = (3 ± √25)/4 = (3 ± 5)/4, so x = 2 or x = -0.5</li>
  </ol>
</details>`
      },
      {
        title: 'Exponential and Logarithmic Functions',
        order: 4,
        videoUrl: 'https://www.youtube.com/embed/eTWCARmrzJ0',
        content: `<h2>🎯 Learning Objectives</h2>
<ul>
  <li>Understand exponential growth and decay</li>
  <li>Graph exponential functions and identify key features</li>
  <li>Understand logarithms as inverse of exponentials</li>
  <li>Apply log properties to solve equations</li>
</ul>

<h2>📈 Exponential Functions: f(x) = a·bˣ</h2>
<p>Where a is the initial value and b is the growth factor.</p>

<table>
  <tr><th>If b > 1</th><td>Exponential GROWTH</td><td>Population, compound interest</td></tr>
  <tr><th>If 0 < b < 1</th><td>Exponential DECAY</td><td>Radioactive decay, depreciation</td></tr>
</table>

<h3>Key Features:</h3>
<ul>
  <li>Horizontal asymptote at y = 0</li>
  <li>y-intercept at (0, a)</li>
  <li>Never touches the x-axis</li>
  <li>Domain: all real numbers</li>
  <li>Range: y > 0 (if a > 0)</li>
</ul>

<h2>🌍 Compound Interest Formula</h2>
<p style="background: #e8f4f8; padding: 15px; border-radius: 8px; text-align: center; font-size: 20px;">
  A = P(1 + r/n)^(nt)
</p>
<p>P = principal, r = rate, n = compounding frequency, t = time</p>

<h3>Example:</h3>
<p>$1000 at 5% compounded monthly for 10 years:</p>
<pre><code>A = 1000(1 + 0.05/12)^(12·10)
A = 1000(1.00417)^120
A ≈ $1,647.01</code></pre>

<h2>📚 Logarithms: The Inverse of Exponentials</h2>
<p style="background: #ffe; padding: 15px; border-radius: 8px; text-align: center; font-size: 18px;">
  <strong>log_b(x) = y</strong> means <strong>b^y = x</strong><br><br>
  "log base b of x equals y" means "b to the power y equals x"
</p>

<h3>Common Logarithms:</h3>
<ul>
  <li><strong>log(x)</strong> = log₁₀(x) (base 10)</li>
  <li><strong>ln(x)</strong> = logₑ(x) (natural log, base e ≈ 2.718)</li>
</ul>

<h3>Converting Between Forms:</h3>
<table>
  <tr><th>Exponential</th><th>Logarithmic</th></tr>
  <tr><td>2³ = 8</td><td>log₂(8) = 3</td></tr>
  <tr><td>10² = 100</td><td>log(100) = 2</td></tr>
  <tr><td>eˣ = 5</td><td>ln(5) = x</td></tr>
</table>

<h2>📋 Logarithm Properties</h2>
<table>
  <tr><th>Property</th><th>Formula</th><th>Example</th></tr>
  <tr><td>Product Rule</td><td>log(AB) = log(A) + log(B)</td><td>log(6) = log(2) + log(3)</td></tr>
  <tr><td>Quotient Rule</td><td>log(A/B) = log(A) - log(B)</td><td>log(5) = log(10) - log(2)</td></tr>
  <tr><td>Power Rule</td><td>log(Aⁿ) = n·log(A)</td><td>log(8) = 3·log(2)</td></tr>
  <tr><td>Change of Base</td><td>log_b(x) = log(x)/log(b)</td><td>log₂(8) = log(8)/log(2)</td></tr>
</table>

<h2>📝 Solving Exponential Equations</h2>
<p>Solve: 3^x = 27</p>
<pre><code>Method 1 (if same base possible):
3^x = 3³
x = 3

Method 2 (using logs):
log(3^x) = log(27)
x·log(3) = log(27)
x = log(27)/log(3) = 3</code></pre>

<p>Solve: 5^(2x) = 7</p>
<pre><code>log(5^(2x)) = log(7)
2x·log(5) = log(7)
x = log(7)/(2·log(5))
x ≈ 0.605</code></pre>

<h2>⚠️ Common Mistakes</h2>
<div style="background: #fee; padding: 15px; border-radius: 8px; margin: 10px 0;">
  <h4 style="color: #c00;">Mistake: log(a + b) ≠ log(a) + log(b)</h4>
  <p>The product rule is log(ab) = log(a) + log(b)</p>
  <p>There is NO rule for log(a + b)!</p>
</div>

<h2>🎯 Practice Problems</h2>
<ol>
  <li>Convert to log form: 4³ = 64</li>
  <li>Simplify: log(1000)</li>
  <li>Solve: 2^x = 32</li>
  <li>Solve: e^(2x) = 10</li>
</ol>

<details>
  <summary><strong>Click to see answers</strong></summary>
  <ol>
    <li>log₄(64) = 3</li>
    <li>log(10³) = 3</li>
    <li>2^x = 2^5, so x = 5</li>
    <li>2x = ln(10), x = ln(10)/2 ≈ 1.15</li>
  </ol>
</details>`
      },
      {
        title: 'Rates of Change and Introduction to Calculus',
        order: 5,
        videoUrl: 'https://www.youtube.com/embed/WUvTyaaNkzM',
        content: `<h2>🎯 Learning Objectives</h2>
<ul>
  <li>Calculate average rate of change</li>
  <li>Understand instantaneous rate of change conceptually</li>
  <li>Connect slope to rate of change</li>
  <li>Interpret rates of change in real contexts</li>
</ul>

<h2>📊 Average Rate of Change</h2>
<p>The average rate of change of f(x) from x = a to x = b is:</p>

<p style="background: #e8f4f8; padding: 20px; border-radius: 8px; text-align: center; font-size: 22px;">
  Average Rate = (f(b) - f(a)) / (b - a)
</p>

<p>This is the same as the SLOPE of the secant line between two points!</p>

<h3>Example:</h3>
<p>Find the average rate of change of f(x) = x² from x = 1 to x = 4.</p>
<pre><code>f(1) = 1² = 1
f(4) = 4² = 16

Average rate = (16 - 1)/(4 - 1) = 15/3 = 5</code></pre>

<p><strong>Interpretation:</strong> On average, the function increased by 5 units for each 1-unit increase in x.</p>

<h2>⚡ Instantaneous Rate of Change</h2>
<p>What if we want the rate of change at EXACTLY one point?</p>

<p>Idea: Take the average rate of change over smaller and smaller intervals!</p>

<h3>Example: f(x) = x² at x = 2</h3>
<table>
  <tr><th>Interval</th><th>Average Rate</th></tr>
  <tr><td>[2, 3]</td><td>(9 - 4)/(3 - 2) = 5</td></tr>
  <tr><td>[2, 2.5]</td><td>(6.25 - 4)/(2.5 - 2) = 4.5</td></tr>
  <tr><td>[2, 2.1]</td><td>(4.41 - 4)/(2.1 - 2) = 4.1</td></tr>
  <tr><td>[2, 2.01]</td><td>(4.0401 - 4)/(2.01 - 2) = 4.01</td></tr>
</table>

<p>As the interval gets smaller, the rate approaches <strong>4</strong>.</p>
<p>This is the <strong>instantaneous rate of change</strong> (derivative) at x = 2!</p>

<h2>🌍 Real-World Applications</h2>
<div style="background: #e8f4e8; padding: 15px; border-radius: 8px;">
  <h4>Problem: Falling Object</h4>
  <p>Height of a dropped ball: h(t) = 100 - 5t² meters</p>
  
  <p><strong>Average velocity from t = 1 to t = 3:</strong></p>
  <pre><code>h(1) = 100 - 5(1) = 95m
h(3) = 100 - 5(9) = 55m

Average velocity = (55 - 95)/(3 - 1) = -40/2 = -20 m/s</code></pre>
  <p>The negative sign means it's falling downward!</p>
</div>

<h2>📈 Connecting to Calculus</h2>
<p>In calculus, you'll learn:</p>
<ul>
  <li><strong>Derivative:</strong> Instantaneous rate of change (the limit as interval → 0)</li>
  <li>For f(x) = x², the derivative f'(x) = 2x</li>
  <li>At x = 2: f'(2) = 2(2) = 4 ✓ (matches our table!)</li>
</ul>

<h3>Derivative Rules (Preview):</h3>
<table>
  <tr><th>Function</th><th>Derivative</th></tr>
  <tr><td>f(x) = xⁿ</td><td>f'(x) = n·x^(n-1)</td></tr>
  <tr><td>f(x) = x³</td><td>f'(x) = 3x²</td></tr>
  <tr><td>f(x) = x²</td><td>f'(x) = 2x</td></tr>
  <tr><td>f(x) = x</td><td>f'(x) = 1</td></tr>
  <tr><td>f(x) = c (constant)</td><td>f'(x) = 0</td></tr>
</table>

<h2>🎯 Practice Problems</h2>
<ol>
  <li>Find the average rate of change of f(x) = 3x - 2 from x = 1 to x = 5</li>
  <li>Find the average rate of change of g(x) = x² + 1 from x = 0 to x = 2</li>
  <li>A population is P(t) = 1000·e^(0.05t). Find average growth rate from t = 0 to t = 10</li>
</ol>

<details>
  <summary><strong>Click to see answers</strong></summary>
  <ol>
    <li>(f(5) - f(1))/(5-1) = (13 - 1)/4 = 3 (constant rate for linear functions!)</li>
    <li>(g(2) - g(0))/(2-0) = (5 - 1)/2 = 2</li>
    <li>P(0) = 1000, P(10) ≈ 1649. Rate = (1649-1000)/10 ≈ 64.9 people/year</li>
  </ol>
</details>`
      },
      {
        title: 'Trigonometric Functions Fundamentals',
        order: 6,
        videoUrl: 'https://www.youtube.com/embed/PUB0TaZ7bhA',
        content: `<h2>🎯 Learning Objectives</h2>
<ul>
  <li>Understand sine, cosine, and tangent ratios</li>
  <li>Use the unit circle for any angle</li>
  <li>Graph basic trig functions</li>
  <li>Solve basic trig equations</li>
</ul>

<h2>📐 SOH-CAH-TOA (Right Triangle Trig)</h2>
<p style="background: #e8f4f8; padding: 15px; border-radius: 8px; font-size: 18px;">
  <strong>SOH:</strong> sin(θ) = Opposite / Hypotenuse<br>
  <strong>CAH:</strong> cos(θ) = Adjacent / Hypotenuse<br>
  <strong>TOA:</strong> tan(θ) = Opposite / Adjacent
</p>

<h3>Example: Right triangle with legs 3 and 4, hypotenuse 5</h3>
<pre><code>For angle θ opposite the side of length 3:
sin(θ) = 3/5 = 0.6
cos(θ) = 4/5 = 0.8
tan(θ) = 3/4 = 0.75</code></pre>

<h2>⭕ The Unit Circle</h2>
<p>The unit circle extends trig to ANY angle, not just acute angles.</p>

<table>
  <tr><th>Angle (degrees)</th><th>Angle (radians)</th><th>sin</th><th>cos</th></tr>
  <tr><td>0°</td><td>0</td><td>0</td><td>1</td></tr>
  <tr><td>30°</td><td>π/6</td><td>1/2</td><td>√3/2</td></tr>
  <tr><td>45°</td><td>π/4</td><td>√2/2</td><td>√2/2</td></tr>
  <tr><td>60°</td><td>π/3</td><td>√3/2</td><td>1/2</td></tr>
  <tr><td>90°</td><td>π/2</td><td>1</td><td>0</td></tr>
  <tr><td>180°</td><td>π</td><td>0</td><td>-1</td></tr>
  <tr><td>270°</td><td>3π/2</td><td>-1</td><td>0</td></tr>
</table>

<h3>CAST Rule (Signs by Quadrant)</h3>
<ul>
  <li><strong>Q1:</strong> All positive</li>
  <li><strong>Q2:</strong> Only Sine positive</li>
  <li><strong>Q3:</strong> Only Tangent positive</li>
  <li><strong>Q4:</strong> Only Cosine positive</li>
</ul>

<h2>📈 Graphing Trig Functions</h2>
<p>For y = A·sin(B(x - C)) + D:</p>
<table>
  <tr><th>Parameter</th><th>Effect</th></tr>
  <tr><td>A</td><td>Amplitude (height from middle to peak)</td></tr>
  <tr><td>B</td><td>Period = 2π/B</td></tr>
  <tr><td>C</td><td>Phase shift (horizontal shift)</td></tr>
  <tr><td>D</td><td>Vertical shift (midline)</td></tr>
</table>

<h3>Example: y = 3sin(2x) + 1</h3>
<ul>
  <li>Amplitude = 3</li>
  <li>Period = 2π/2 = π</li>
  <li>Midline at y = 1</li>
  <li>Max value = 1 + 3 = 4</li>
  <li>Min value = 1 - 3 = -2</li>
</ul>

<h2>🌍 Real-World Application</h2>
<div style="background: #e8f4e8; padding: 15px; border-radius: 8px;">
  <h4>Problem: Ferris Wheel</h4>
  <p>A Ferris wheel has radius 10m, center 12m high, completes one rotation in 60 seconds.</p>
  
  <p>Height function: h(t) = -10cos(πt/30) + 12</p>
  <ul>
    <li>Amplitude = 10 (radius)</li>
    <li>Period = 60s (one rotation)</li>
    <li>Midline = 12m (center height)</li>
    <li>At t = 0: h = -10(1) + 12 = 2m (bottom)</li>
    <li>At t = 30: h = -10(-1) + 12 = 22m (top)</li>
  </ul>
</div>

<h2>⚠️ Common Mistakes</h2>
<div style="background: #fee; padding: 15px; border-radius: 8px; margin: 10px 0;">
  <h4 style="color: #c00;">Mistake: Calculator in wrong mode</h4>
  <p>Make sure your calculator is in DEGREE mode for degree problems and RADIAN mode for radian problems!</p>
  <p>sin(30°) = 0.5, but sin(30 radians) ≈ -0.988</p>
</div>

<h2>🎯 Practice Problems</h2>
<ol>
  <li>Find sin(60°) and cos(60°) without a calculator</li>
  <li>In which quadrants is tan(θ) positive?</li>
  <li>Find the period of y = sin(4x)</li>
  <li>A ladder leans against a wall at 70°. If the ladder is 5m, how high does it reach?</li>
</ol>

<details>
  <summary><strong>Click to see answers</strong></summary>
  <ol>
    <li>sin(60°) = √3/2 ≈ 0.866, cos(60°) = 1/2 = 0.5</li>
    <li>Q1 and Q3</li>
    <li>Period = 2π/4 = π/2</li>
    <li>height = 5·sin(70°) ≈ 4.7m</li>
  </ol>
</details>`
      }
    ],
    quizQuestions: [
      { text: 'If f(x) = 2x² - 3, what is f(-2)?', options: ['5', '1', '-11', '11'], correctIndex: 0 },
      { text: 'What is the domain of f(x) = √(x - 5)?', options: ['x ≥ 0', 'x ≥ 5', 'x ≤ 5', 'All real numbers'], correctIndex: 1 },
      { text: 'In f(x) = a(x-h)² + k, the vertex is at:', options: ['(a, k)', '(h, k)', '(-h, k)', '(h, -k)'], correctIndex: 1 },
      { text: 'If the discriminant b² - 4ac < 0, the equation has:', options: ['Two real solutions', 'One real solution', 'No real solutions', 'Infinite solutions'], correctIndex: 2 },
      { text: 'What is log₂(8)?', options: ['2', '3', '4', '8'], correctIndex: 1 },
      { text: 'The average rate of change is the same as:', options: ['The y-intercept', 'The slope of secant line', 'The vertex', 'The domain'], correctIndex: 1 },
      { text: 'What is sin(90°)?', options: ['0', '1', '-1', 'undefined'], correctIndex: 1 },
      { text: 'The period of y = sin(2x) is:', options: ['2π', 'π', '4π', 'π/2'], correctIndex: 1 }
    ]
  },
  // ==========================================
  // OTHER COURSES (keeping the best ones, enhanced)
  // ==========================================
  {
    title: 'Introduction to Programming',
    description: 'Learn the fundamentals of programming with Python. Perfect for absolute beginners who want to start their coding journey.',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&fit=crop',
    category: 'Technology',
    difficulty: 'Beginner',
    duration: '8 hours',
    lessons: [
      {
        title: 'What is Programming?',
        order: 1,
        videoUrl: 'https://www.youtube.com/embed/zOjov-2OZ0E',
        content: `<h2>Welcome to Programming!</h2>
<p>Programming is the process of creating instructions that tell a computer how to perform a task. It's like writing a recipe, but for computers!</p>

<h3>Why Learn Programming?</h3>
<ul>
  <li><strong>Problem Solving:</strong> Programming teaches you to break down complex problems into smaller, manageable pieces.</li>
  <li><strong>Career Opportunities:</strong> Software developers are in high demand across all industries.</li>
  <li><strong>Creativity:</strong> Build apps, games, websites, and more!</li>
  <li><strong>Automation:</strong> Automate repetitive tasks to save time.</li>
</ul>

<h3>Programming Languages</h3>
<p>There are many programming languages, each with its own strengths:</p>
<ul>
  <li><strong>Python:</strong> Great for beginners, data science, and automation</li>
  <li><strong>JavaScript:</strong> Powers the web and interactive applications</li>
  <li><strong>Java:</strong> Used in enterprise applications and Android development</li>
  <li><strong>C++:</strong> For system programming and game development</li>
</ul>

<p>In this course, we'll focus on Python because it's beginner-friendly and versatile.</p>`
      },
      {
        title: 'Setting Up Your Development Environment',
        order: 2,
        videoUrl: 'https://www.youtube.com/embed/YYXdXT2l-Gg',
        content: `<h2>Setting Up Python</h2>
<p>Before we start coding, we need to set up our development environment. This includes installing Python and a code editor.</p>

<h3>Installing Python</h3>
<ol>
  <li>Visit <a href="https://python.org" target="_blank">python.org</a></li>
  <li>Download the latest version of Python 3</li>
  <li>Run the installer and check "Add Python to PATH"</li>
  <li>Complete the installation</li>
</ol>

<h3>Choosing a Code Editor</h3>
<p>A code editor is where you'll write your programs. Popular choices include:</p>
<ul>
  <li><strong>VS Code:</strong> Free, powerful, and beginner-friendly</li>
  <li><strong>PyCharm:</strong> Feature-rich IDE specifically for Python</li>
  <li><strong>Jupyter Notebook:</strong> Great for learning and data science</li>
</ul>

<h3>Your First Python Command</h3>
<pre><code>print("Hello, World!")</code></pre>
<p>This simple command prints text to the screen. Congratulations, you're a programmer!</p>`
      },
      {
        title: 'Variables and Data Types',
        order: 3,
        content: `<h2>Understanding Variables</h2>
<p>Variables are containers for storing data values. Think of them as labeled boxes where you can put information.</p>

<h3>Creating Variables in Python</h3>
<pre><code>name = "Alice"
age = 25
height = 5.6
is_student = True</code></pre>

<h3>Data Types</h3>
<table>
  <tr><th>Type</th><th>Example</th><th>Description</th></tr>
  <tr><td>String</td><td>"Hello"</td><td>Text data</td></tr>
  <tr><td>Integer</td><td>42</td><td>Whole numbers</td></tr>
  <tr><td>Float</td><td>3.14</td><td>Decimal numbers</td></tr>
  <tr><td>Boolean</td><td>True/False</td><td>Logical values</td></tr>
</table>

<h3>Variable Naming Rules</h3>
<ul>
  <li>Must start with a letter or underscore</li>
  <li>Can contain letters, numbers, and underscores</li>
  <li>Case-sensitive (name and Name are different)</li>
  <li>Cannot use Python keywords (if, for, while, etc.)</li>
</ul>`
      },
      {
        title: 'Control Flow: Conditions',
        order: 4,
        content: `<h2>Making Decisions with Conditionals</h2>
<p>Programs often need to make decisions based on certain conditions. Python uses if, elif, and else statements for this.</p>

<h3>The if Statement</h3>
<pre><code>age = 18

if age >= 18:
    print("You are an adult")
else:
    print("You are a minor")</code></pre>

<h3>Multiple Conditions with elif</h3>
<pre><code>score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"

print(f"Your grade is {grade}")</code></pre>

<h3>Comparison Operators</h3>
<ul>
  <li><code>==</code> Equal to</li>
  <li><code>!=</code> Not equal to</li>
  <li><code>></code> Greater than</li>
  <li><code><</code> Less than</li>
  <li><code>>=</code> Greater than or equal to</li>
  <li><code><=</code> Less than or equal to</li>
</ul>`
      },
      {
        title: 'Loops: Repeating Actions',
        order: 5,
        content: `<h2>Loops in Python</h2>
<p>Loops allow you to execute a block of code multiple times. Python has two main types of loops: for loops and while loops.</p>

<h3>For Loops</h3>
<pre><code># Print numbers 1 to 5
for i in range(1, 6):
    print(i)

# Loop through a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)</code></pre>

<h3>While Loops</h3>
<pre><code>count = 0
while count < 5:
    print(count)
    count += 1</code></pre>

<h3>Loop Control</h3>
<ul>
  <li><code>break</code> - Exit the loop immediately</li>
  <li><code>continue</code> - Skip to the next iteration</li>
</ul>

<pre><code>for i in range(10):
    if i == 5:
        break  # Stop at 5
    print(i)</code></pre>`
      },
      {
        title: 'Functions: Reusable Code',
        order: 6,
        content: `<h2>Creating Functions</h2>
<p>Functions are reusable blocks of code that perform a specific task. They help organize your code and avoid repetition.</p>

<h3>Defining a Function</h3>
<pre><code>def greet(name):
    return f"Hello, {name}!"

message = greet("Alice")
print(message)  # Output: Hello, Alice!</code></pre>

<h3>Function Parameters</h3>
<pre><code>def calculate_area(length, width):
    return length * width

area = calculate_area(5, 3)
print(f"Area: {area}")  # Output: Area: 15</code></pre>

<h3>Default Parameters</h3>
<pre><code>def power(base, exponent=2):
    return base ** exponent

print(power(3))      # Output: 9 (3 squared)
print(power(3, 3))   # Output: 27 (3 cubed)</code></pre>

<h3>Benefits of Functions</h3>
<ul>
  <li>Code reusability</li>
  <li>Better organization</li>
  <li>Easier testing and debugging</li>
  <li>Improved readability</li>
</ul>`
      }
    ],
    quizQuestions: [
      { text: 'What is Python?', options: ['A snake species', 'A programming language', 'A web browser', 'An operating system'], correctIndex: 1 },
      { text: 'Which symbol is used for single-line comments in Python?', options: ['// ', '/* */', '#', '--'], correctIndex: 2 },
      { text: 'What data type is "Hello, World!"?', options: ['Integer', 'Float', 'Boolean', 'String'], correctIndex: 3 },
      { text: 'Which keyword is used to define a function in Python?', options: ['function', 'func', 'def', 'define'], correctIndex: 2 },
      { text: 'What does the range(5) function return?', options: ['Numbers 1 to 5', 'Numbers 0 to 5', 'Numbers 0 to 4', 'Numbers 1 to 4'], correctIndex: 2 },
      { text: 'Which loop is best when you know the number of iterations?', options: ['while loop', 'for loop', 'do-while loop', 'infinite loop'], correctIndex: 1 },
      { text: 'What is the output of print(2 ** 3)?', options: ['6', '8', '5', '9'], correctIndex: 1 }
    ]
  },
  {
    title: 'Digital Marketing Basics',
    description: 'Master the fundamentals of digital marketing including SEO, social media, content marketing, and analytics.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Social_media_collection_2026.png/1280px-Social_media_collection_2026.png',
    category: 'Marketing',
    difficulty: 'Beginner',
    duration: '6 hours',
    lessons: [
      {
        title: 'Introduction to Digital Marketing',
        order: 1,
        videoUrl: 'https://www.youtube.com/embed/bixR-KIJKYM',
        content: `<h2>What is Digital Marketing?</h2>
<p>Digital marketing is the promotion of products or services using digital channels such as search engines, social media, email, and websites.</p>

<h3>Why Digital Marketing Matters</h3>
<ul>
  <li><strong>Global Reach:</strong> Connect with customers worldwide</li>
  <li><strong>Cost-Effective:</strong> Often cheaper than traditional marketing</li>
  <li><strong>Measurable:</strong> Track every click, view, and conversion</li>
  <li><strong>Targeted:</strong> Reach specific audiences with precision</li>
</ul>

<h3>Key Digital Marketing Channels</h3>
<ol>
  <li>Search Engine Optimization (SEO)</li>
  <li>Pay-Per-Click Advertising (PPC)</li>
  <li>Social Media Marketing</li>
  <li>Content Marketing</li>
  <li>Email Marketing</li>
  <li>Affiliate Marketing</li>
</ol>`
      },
      {
        title: 'Search Engine Optimization (SEO)',
        order: 2,
        content: `<h2>Understanding SEO</h2>
<p>SEO is the practice of optimizing your website to rank higher in search engine results pages (SERPs), driving organic traffic to your site.</p>

<h3>On-Page SEO Elements</h3>
<ul>
  <li><strong>Title Tags:</strong> Include primary keywords in page titles</li>
  <li><strong>Meta Descriptions:</strong> Write compelling descriptions</li>
  <li><strong>Header Tags:</strong> Structure content with H1, H2, H3</li>
  <li><strong>Content Quality:</strong> Create valuable, relevant content</li>
  <li><strong>Internal Linking:</strong> Connect related pages</li>
</ul>

<h3>Off-Page SEO</h3>
<ul>
  <li><strong>Backlinks:</strong> Get quality links from other websites</li>
  <li><strong>Social Signals:</strong> Engagement on social platforms</li>
  <li><strong>Brand Mentions:</strong> Online references to your brand</li>
</ul>

<h3>Technical SEO</h3>
<ul>
  <li>Site speed optimization</li>
  <li>Mobile responsiveness</li>
  <li>XML sitemaps</li>
  <li>Secure HTTPS connections</li>
</ul>`
      },
      {
        title: 'Social Media Marketing',
        order: 3,
        content: `<h2>Leveraging Social Media</h2>
<p>Social media marketing involves using platforms like Facebook, Instagram, Twitter, and LinkedIn to connect with your audience and promote your brand.</p>

<h3>Choosing the Right Platforms</h3>
<table>
  <tr><th>Platform</th><th>Best For</th><th>Audience</th></tr>
  <tr><td>Facebook</td><td>Community building</td><td>All demographics</td></tr>
  <tr><td>Instagram</td><td>Visual content</td><td>18-34 year olds</td></tr>
  <tr><td>LinkedIn</td><td>B2B marketing</td><td>Professionals</td></tr>
  <tr><td>TikTok</td><td>Short-form video</td><td>Gen Z</td></tr>
</table>

<h3>Content Strategy</h3>
<ul>
  <li><strong>80/20 Rule:</strong> 80% valuable content, 20% promotional</li>
  <li><strong>Consistency:</strong> Post regularly to stay visible</li>
  <li><strong>Engagement:</strong> Respond to comments and messages</li>
  <li><strong>Hashtags:</strong> Use relevant hashtags for discovery</li>
</ul>`
      },
      {
        title: 'Content Marketing',
        order: 4,
        content: `<h2>Creating Valuable Content</h2>
<p>Content marketing focuses on creating and distributing valuable, relevant content to attract and retain a clearly defined audience.</p>

<h3>Types of Content</h3>
<ul>
  <li><strong>Blog Posts:</strong> Educational articles and guides</li>
  <li><strong>Videos:</strong> Tutorials, reviews, behind-the-scenes</li>
  <li><strong>Infographics:</strong> Visual data representations</li>
  <li><strong>Podcasts:</strong> Audio content for on-the-go consumption</li>
  <li><strong>E-books:</strong> In-depth guides and resources</li>
</ul>

<h3>Content Calendar</h3>
<p>Plan your content in advance with a content calendar that includes:</p>
<ul>
  <li>Publication dates</li>
  <li>Content topics and formats</li>
  <li>Target keywords</li>
  <li>Distribution channels</li>
  <li>Responsible team members</li>
</ul>`
      },
      {
        title: 'Email Marketing',
        order: 5,
        content: `<h2>Email Marketing Fundamentals</h2>
<p>Email marketing remains one of the most effective digital marketing channels, with an average ROI of $42 for every $1 spent.</p>

<h3>Building Your Email List</h3>
<ul>
  <li>Offer lead magnets (free downloads, guides)</li>
  <li>Use opt-in forms on your website</li>
  <li>Run contests or giveaways</li>
  <li>Provide exclusive content for subscribers</li>
</ul>

<h3>Email Campaign Types</h3>
<ul>
  <li><strong>Welcome Series:</strong> Introduce new subscribers</li>
  <li><strong>Newsletters:</strong> Regular updates and content</li>
  <li><strong>Promotional:</strong> Sales and special offers</li>
  <li><strong>Abandoned Cart:</strong> Recover lost sales</li>
</ul>

<h3>Best Practices</h3>
<ul>
  <li>Personalize subject lines</li>
  <li>Segment your audience</li>
  <li>A/B test your campaigns</li>
  <li>Optimize for mobile devices</li>
</ul>`
      },
      {
        title: 'Analytics and Measurement',
        order: 6,
        content: `<h2>Measuring Success</h2>
<p>Analytics help you understand what's working and what needs improvement in your marketing efforts.</p>

<h3>Key Metrics to Track</h3>
<ul>
  <li><strong>Traffic:</strong> Website visitors and page views</li>
  <li><strong>Conversion Rate:</strong> Percentage of visitors who take action</li>
  <li><strong>Bounce Rate:</strong> Visitors who leave immediately</li>
  <li><strong>Engagement:</strong> Likes, shares, comments</li>
  <li><strong>ROI:</strong> Return on marketing investment</li>
</ul>

<h3>Tools for Analytics</h3>
<ul>
  <li><strong>Google Analytics:</strong> Website traffic and behavior</li>
  <li><strong>Google Search Console:</strong> Search performance</li>
  <li><strong>Social Media Insights:</strong> Platform-specific analytics</li>
  <li><strong>Email Analytics:</strong> Open rates, click rates</li>
</ul>`
      }
    ],
    quizQuestions: [
      { text: 'What does SEO stand for?', options: ['Search Engine Optimization', 'Social Engine Optimization', 'Search Email Outreach', 'Site Enhancement Operation'], correctIndex: 0 },
      { text: 'Which metric measures the percentage of visitors who leave without interacting?', options: ['Conversion rate', 'Click-through rate', 'Bounce rate', 'Engagement rate'], correctIndex: 2 },
      { text: 'What is a lead magnet?', options: ['A type of advertisement', 'A free offer to collect emails', 'A social media tool', 'A website plugin'], correctIndex: 1 },
      { text: 'Which platform is best for B2B marketing?', options: ['TikTok', 'Instagram', 'LinkedIn', 'Snapchat'], correctIndex: 2 },
      { text: 'What is the recommended content ratio (valuable vs promotional)?', options: ['50/50', '60/40', '80/20', '70/30'], correctIndex: 2 },
      { text: 'What is the average ROI for email marketing per $1 spent?', options: ['$10', '$25', '$42', '$100'], correctIndex: 2 }
    ]
  },
  {
    title: 'Data Science Fundamentals',
    description: 'Explore the world of data science including data analysis, visualization, and machine learning concepts.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
    category: 'Technology',
    difficulty: 'Intermediate',
    duration: '10 hours',
    lessons: [
      {
        title: 'Introduction to Data Science',
        order: 1,
        videoUrl: 'https://www.youtube.com/embed/X3paOmcrTjQ',
        content: `<h2>What is Data Science?</h2>
<p>Data science is an interdisciplinary field that uses scientific methods, algorithms, and systems to extract knowledge and insights from structured and unstructured data.</p>

<h3>The Data Science Process</h3>
<ol>
  <li><strong>Problem Definition:</strong> Understand the business question</li>
  <li><strong>Data Collection:</strong> Gather relevant data</li>
  <li><strong>Data Cleaning:</strong> Handle missing values and errors</li>
  <li><strong>Exploratory Analysis:</strong> Understand patterns in data</li>
  <li><strong>Modeling:</strong> Apply statistical or ML models</li>
  <li><strong>Evaluation:</strong> Assess model performance</li>
  <li><strong>Deployment:</strong> Put insights into action</li>
</ol>

<h3>Essential Skills</h3>
<ul>
  <li>Programming (Python, R)</li>
  <li>Statistics and mathematics</li>
  <li>Machine learning</li>
  <li>Data visualization</li>
  <li>Domain knowledge</li>
</ul>`
      },
      {
        title: 'Data Types and Structures',
        order: 2,
        content: `<h2>Understanding Data</h2>
<p>Data comes in many forms, and understanding these types is crucial for effective analysis.</p>

<h3>Data Types</h3>
<table>
  <tr><th>Type</th><th>Description</th><th>Examples</th></tr>
  <tr><td>Numerical</td><td>Quantitative values</td><td>Age, salary, temperature</td></tr>
  <tr><td>Categorical</td><td>Discrete categories</td><td>Gender, country, product type</td></tr>
  <tr><td>Ordinal</td><td>Ordered categories</td><td>Education level, ratings</td></tr>
  <tr><td>Text</td><td>Unstructured text</td><td>Reviews, comments, documents</td></tr>
</table>

<h3>Data Structures in Python</h3>
<ul>
  <li><strong>Lists:</strong> Ordered collections</li>
  <li><strong>Dictionaries:</strong> Key-value pairs</li>
  <li><strong>NumPy Arrays:</strong> Numerical arrays</li>
  <li><strong>Pandas DataFrames:</strong> Tabular data</li>
</ul>`
      },
      {
        title: 'Data Cleaning and Preprocessing',
        order: 3,
        content: `<h2>Preparing Data for Analysis</h2>
<p>Data scientists spend 60-80% of their time cleaning data. This step is crucial for accurate analysis.</p>

<h3>Common Data Issues</h3>
<ul>
  <li><strong>Missing Values:</strong> Empty or null entries</li>
  <li><strong>Duplicates:</strong> Repeated records</li>
  <li><strong>Inconsistent Formatting:</strong> Different date formats, cases</li>
  <li><strong>Outliers:</strong> Extreme values</li>
  <li><strong>Invalid Data:</strong> Incorrect or impossible values</li>
</ul>

<h3>Handling Missing Data</h3>
<pre><code># Remove rows with missing values
df.dropna()

# Fill missing values with mean
df.fillna(df.mean())

# Forward fill
df.fillna(method='ffill')</code></pre>

<h3>Feature Engineering</h3>
<p>Create new features from existing data to improve model performance:</p>
<ul>
  <li>Date extraction (year, month, day)</li>
  <li>Binning continuous variables</li>
  <li>One-hot encoding categorical variables</li>
</ul>`
      },
      {
        title: 'Exploratory Data Analysis',
        order: 4,
        content: `<h2>Discovering Insights</h2>
<p>Exploratory Data Analysis (EDA) is the process of investigating datasets to summarize their main characteristics.</p>

<h3>Statistical Measures</h3>
<ul>
  <li><strong>Mean:</strong> Average value</li>
  <li><strong>Median:</strong> Middle value</li>
  <li><strong>Mode:</strong> Most frequent value</li>
  <li><strong>Standard Deviation:</strong> Spread of data</li>
  <li><strong>Correlation:</strong> Relationship between variables</li>
</ul>

<h3>Visualization Types</h3>
<ul>
  <li><strong>Histograms:</strong> Distribution of single variable</li>
  <li><strong>Box Plots:</strong> Summary statistics and outliers</li>
  <li><strong>Scatter Plots:</strong> Relationships between variables</li>
  <li><strong>Bar Charts:</strong> Categorical comparisons</li>
  <li><strong>Heatmaps:</strong> Correlation matrices</li>
</ul>`
      },
      {
        title: 'Introduction to Machine Learning',
        order: 5,
        content: `<h2>Machine Learning Basics</h2>
<p>Machine learning is a subset of AI that enables systems to learn and improve from experience without being explicitly programmed.</p>

<h3>Types of Machine Learning</h3>
<ul>
  <li><strong>Supervised Learning:</strong> Learning from labeled data
    <ul>
      <li>Classification: Predicting categories</li>
      <li>Regression: Predicting continuous values</li>
    </ul>
  </li>
  <li><strong>Unsupervised Learning:</strong> Finding patterns in unlabeled data
    <ul>
      <li>Clustering: Grouping similar items</li>
      <li>Dimensionality Reduction: Simplifying data</li>
    </ul>
  </li>
  <li><strong>Reinforcement Learning:</strong> Learning through interaction</li>
</ul>

<h3>Common Algorithms</h3>
<ul>
  <li>Linear/Logistic Regression</li>
  <li>Decision Trees</li>
  <li>Random Forest</li>
  <li>K-Means Clustering</li>
  <li>Neural Networks</li>
</ul>`
      },
      {
        title: 'Model Evaluation',
        order: 6,
        content: `<h2>Assessing Model Performance</h2>
<p>Understanding how well your model performs is essential for making improvements and making informed decisions.</p>

<h3>Classification Metrics</h3>
<ul>
  <li><strong>Accuracy:</strong> Overall correct predictions</li>
  <li><strong>Precision:</strong> True positives / Predicted positives</li>
  <li><strong>Recall:</strong> True positives / Actual positives</li>
  <li><strong>F1 Score:</strong> Harmonic mean of precision and recall</li>
  <li><strong>AUC-ROC:</strong> Area under the ROC curve</li>
</ul>

<h3>Regression Metrics</h3>
<ul>
  <li><strong>MAE:</strong> Mean Absolute Error</li>
  <li><strong>MSE:</strong> Mean Squared Error</li>
  <li><strong>RMSE:</strong> Root Mean Squared Error</li>
  <li><strong>R²:</strong> Coefficient of determination</li>
</ul>

<h3>Cross-Validation</h3>
<p>Split data multiple ways to get a robust estimate of model performance:</p>
<pre><code>from sklearn.model_selection import cross_val_score
scores = cross_val_score(model, X, y, cv=5)
print(f"Average Score: {scores.mean()}")</code></pre>`
      }
    ],
    quizQuestions: [
      { text: 'What percentage of time do data scientists typically spend on data cleaning?', options: ['10-20%', '30-40%', '60-80%', '90-100%'], correctIndex: 2 },
      { text: 'Which type of machine learning uses labeled data?', options: ['Unsupervised learning', 'Supervised learning', 'Reinforcement learning', 'Transfer learning'], correctIndex: 1 },
      { text: 'What is the purpose of a heatmap in EDA?', options: ['Show data distribution', 'Display correlation matrices', 'Plot time series', 'Compare categories'], correctIndex: 1 },
      { text: 'Which metric is the harmonic mean of precision and recall?', options: ['Accuracy', 'AUC', 'F1 Score', 'R²'], correctIndex: 2 },
      { text: 'What does clustering do?', options: ['Predicts categories', 'Groups similar items', 'Reduces features', 'Fills missing values'], correctIndex: 1 },
      { text: 'What is one-hot encoding used for?', options: ['Numerical variables', 'Categorical variables', 'Missing values', 'Outliers'], correctIndex: 1 },
      { text: 'Which is NOT a common regression algorithm?', options: ['Linear Regression', 'Random Forest', 'K-Means', 'Decision Trees'], correctIndex: 2 }
    ]
  },
  {
    title: 'Creative Writing',
    description: 'Develop your creative writing skills from storytelling techniques to character development and world-building.',
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=450&fit=crop',
    category: 'Arts',
    difficulty: 'Beginner',
    duration: '5 hours',
    lessons: [
      {
        title: 'The Art of Storytelling',
        order: 1,
        content: `<h2>Understanding Story Structure</h2>
<p>Every great story follows a structure that takes readers on a journey. Understanding this structure is the foundation of creative writing.</p>

<h3>The Three-Act Structure</h3>
<ol>
  <li><strong>Act 1 - Setup:</strong> Introduce characters, setting, and conflict</li>
  <li><strong>Act 2 - Confrontation:</strong> Develop the conflict, build tension</li>
  <li><strong>Act 3 - Resolution:</strong> Climax and conclusion</li>
</ol>

<h3>Story Elements</h3>
<ul>
  <li><strong>Hook:</strong> Grab the reader's attention immediately</li>
  <li><strong>Rising Action:</strong> Build tension and stakes</li>
  <li><strong>Climax:</strong> The peak of conflict</li>
  <li><strong>Falling Action:</strong> Consequences of the climax</li>
  <li><strong>Resolution:</strong> Tie up loose ends</li>
</ul>

<h3>The Hero's Journey</h3>
<p>Joseph Campbell's monomyth provides a template for compelling stories:</p>
<ul>
  <li>The Call to Adventure</li>
  <li>Crossing the Threshold</li>
  <li>Tests and Allies</li>
  <li>The Ordeal</li>
  <li>The Return</li>
</ul>`
      },
      {
        title: 'Creating Compelling Characters',
        order: 2,
        content: `<h2>Character Development</h2>
<p>Characters are the heart of any story. Readers connect with characters, not plots.</p>

<h3>Character Dimensions</h3>
<ul>
  <li><strong>Physical:</strong> Appearance, mannerisms, voice</li>
  <li><strong>Psychological:</strong> Fears, desires, beliefs</li>
  <li><strong>Social:</strong> Relationships, status, background</li>
</ul>

<h3>The Character Arc</h3>
<p>Characters should change throughout the story:</p>
<ul>
  <li><strong>Starting Point:</strong> Where they begin (flawed, incomplete)</li>
  <li><strong>Catalyst:</strong> What forces change</li>
  <li><strong>Growth:</strong> How they develop</li>
  <li><strong>Transformation:</strong> Who they become</li>
</ul>

<h3>Character Types</h3>
<ul>
  <li><strong>Protagonist:</strong> The main character</li>
  <li><strong>Antagonist:</strong> Opposes the protagonist</li>
  <li><strong>Mentor:</strong> Guides the protagonist</li>
  <li><strong>Foil:</strong> Contrasts with the protagonist</li>
</ul>`
      },
      {
        title: 'Show, Don\'t Tell',
        order: 3,
        content: `<h2>The Golden Rule of Writing</h2>
<p>"Show, don't tell" is the most important principle in creative writing. Instead of stating emotions or facts, demonstrate them through action and detail.</p>

<h3>Telling vs Showing</h3>
<p><strong>Telling:</strong> "Sarah was angry."</p>
<p><strong>Showing:</strong> "Sarah's hands trembled as she crumpled the letter. She hurled it across the room, watching it bounce off the wall."</p>

<h3>Techniques for Showing</h3>
<ul>
  <li><strong>Body Language:</strong> Show emotions through physical reactions</li>
  <li><strong>Dialogue:</strong> Let characters reveal themselves through speech</li>
  <li><strong>Action:</strong> Show what characters do, not what they feel</li>
  <li><strong>Sensory Details:</strong> Engage all five senses</li>
</ul>

<h3>When Telling is Okay</h3>
<ul>
  <li>Transitioning between scenes</li>
  <li>Summarizing less important information</li>
  <li>Establishing backstory quickly</li>
</ul>`
      },
      {
        title: 'Dialogue That Sparkles',
        order: 4,
        content: `<h2>Writing Effective Dialogue</h2>
<p>Great dialogue reveals character, advances plot, and keeps readers engaged.</p>

<h3>Dialogue Functions</h3>
<ul>
  <li>Reveal character personality and background</li>
  <li>Create conflict and tension</li>
  <li>Provide information naturally</li>
  <li>Establish relationships</li>
  <li>Pace the story</li>
</ul>

<h3>Dialogue Tips</h3>
<ul>
  <li><strong>Make Each Voice Distinct:</strong> Characters should sound different</li>
  <li><strong>Use Subtext:</strong> What's unsaid is often more powerful</li>
  <li><strong>Keep It Lean:</strong> Cut unnecessary words</li>
  <li><strong>Read It Aloud:</strong> Test how it sounds</li>
</ul>

<h3>Dialogue Tags</h3>
<p>Use "said" most of the time—it's invisible to readers. Use action beats instead of tags:</p>
<p>"I can't believe you did that." <em>She slammed the door.</em></p>`
      },
      {
        title: 'World-Building',
        order: 5,
        content: `<h2>Creating Believable Worlds</h2>
<p>Whether writing fantasy, sci-fi, or contemporary fiction, world-building creates an immersive experience for readers.</p>

<h3>Elements of World-Building</h3>
<ul>
  <li><strong>Setting:</strong> Physical environment and geography</li>
  <li><strong>Culture:</strong> Customs, traditions, beliefs</li>
  <li><strong>History:</strong> Past events that shape the present</li>
  <li><strong>Technology/Magic:</strong> What's possible in this world</li>
  <li><strong>Society:</strong> Power structures, economics</li>
</ul>

<h3>The Iceberg Principle</h3>
<p>Know 10 times more about your world than you show. This depth shows through in subtle details.</p>

<h3>Integration Tips</h3>
<ul>
  <li>Weave details naturally into narrative</li>
  <li>Use character perspective to reveal the world</li>
  <li>Avoid info-dumps</li>
  <li>Let readers discover gradually</li>
</ul>`
      }
    ],
    quizQuestions: [
      { text: 'What is the three-act structure?', options: ['Beginning, middle, end', 'Setup, confrontation, resolution', 'Hook, climax, twist', 'Introduction, conflict, twist'], correctIndex: 1 },
      { text: 'What does "show, don\'t tell" mean?', options: ['Use more descriptions', 'Demonstrate through action instead of stating', 'Write longer sentences', 'Include more dialogue'], correctIndex: 1 },
      { text: 'Which character type opposes the protagonist?', options: ['Mentor', 'Foil', 'Antagonist', 'Ally'], correctIndex: 2 },
      { text: 'What is subtext in dialogue?', options: ['The meaning below the words', 'Text formatting', 'Background music', 'Internal monologue'], correctIndex: 0 },
      { text: 'The Iceberg Principle suggests you should:', options: ['Show everything you know', 'Know much more than you reveal', 'Keep worlds simple', 'Focus only on the main character'], correctIndex: 1 }
    ]
  },
  {
    title: 'Personal Finance Essentials',
    description: 'Learn to manage your money wisely with budgeting, saving, investing, and retirement planning strategies.',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=450&fit=crop',
    category: 'Finance',
    difficulty: 'Beginner',
    duration: '7 hours',
    lessons: [
      {
        title: 'Budgeting Basics',
        order: 1,
        videoUrl: 'https://www.youtube.com/embed/HQzoZfc3GwQ',
        content: `<h2>Creating Your Budget</h2>
<p>A budget is a plan for your money. It helps you understand where your money goes and ensures you're working toward your financial goals.</p>

<h3>The 50/30/20 Rule</h3>
<ul>
  <li><strong>50% Needs:</strong> Housing, utilities, groceries, transportation</li>
  <li><strong>30% Wants:</strong> Entertainment, dining out, hobbies</li>
  <li><strong>20% Savings:</strong> Emergency fund, retirement, investments</li>
</ul>

<h3>Steps to Create a Budget</h3>
<ol>
  <li>Calculate your monthly income</li>
  <li>List all expenses (fixed and variable)</li>
  <li>Categorize expenses</li>
  <li>Set spending limits for each category</li>
  <li>Track and adjust monthly</li>
</ol>

<h3>Budgeting Methods</h3>
<ul>
  <li><strong>Zero-Based:</strong> Every dollar has a purpose</li>
  <li><strong>Envelope System:</strong> Cash in physical envelopes</li>
  <li><strong>Pay Yourself First:</strong> Save before spending</li>
</ul>`
      },
      {
        title: 'Building an Emergency Fund',
        order: 2,
        content: `<h2>Your Financial Safety Net</h2>
<p>An emergency fund is money set aside for unexpected expenses like medical bills, car repairs, or job loss.</p>

<h3>How Much to Save</h3>
<ul>
  <li><strong>Starter:</strong> $1,000 for minor emergencies</li>
  <li><strong>Basic:</strong> 3 months of expenses</li>
  <li><strong>Full:</strong> 6 months of expenses</li>
  <li><strong>Extended:</strong> 12 months for self-employed</li>
</ul>

<h3>Where to Keep It</h3>
<ul>
  <li>High-yield savings account</li>
  <li>Money market account</li>
  <li>NOT in investments (too risky)</li>
  <li>NOT under your mattress (no growth)</li>
</ul>

<h3>Building Your Fund</h3>
<ol>
  <li>Set a monthly savings target</li>
  <li>Automate transfers</li>
  <li>Save windfalls (tax refunds, bonuses)</li>
  <li>Reduce expenses temporarily</li>
</ol>`
      },
      {
        title: 'Understanding Debt',
        order: 3,
        content: `<h2>Managing and Eliminating Debt</h2>
<p>Not all debt is equal. Understanding the difference between good and bad debt helps you make smarter financial decisions.</p>

<h3>Good Debt vs Bad Debt</h3>
<table>
  <tr><th>Good Debt</th><th>Bad Debt</th></tr>
  <tr><td>Mortgage (builds equity)</td><td>Credit card debt</td></tr>
  <tr><td>Student loans (increases earning potential)</td><td>Payday loans</td></tr>
  <tr><td>Business loans</td><td>Car loans (depreciating asset)</td></tr>
</table>

<h3>Debt Payoff Strategies</h3>
<ul>
  <li><strong>Avalanche Method:</strong> Pay highest interest first (saves money)</li>
  <li><strong>Snowball Method:</strong> Pay smallest balance first (psychological wins)</li>
</ul>

<h3>Debt-to-Income Ratio</h3>
<p>Your DTI is your monthly debt payments divided by monthly income. Keep it below 36%.</p>`
      },
      {
        title: 'Introduction to Investing',
        order: 4,
        content: `<h2>Growing Your Wealth</h2>
<p>Investing puts your money to work, allowing it to grow over time through the power of compound interest.</p>

<h3>Investment Options</h3>
<ul>
  <li><strong>Stocks:</strong> Ownership in companies</li>
  <li><strong>Bonds:</strong> Loans to governments/corporations</li>
  <li><strong>Mutual Funds:</strong> Pooled investments</li>
  <li><strong>ETFs:</strong> Traded funds tracking indexes</li>
  <li><strong>Real Estate:</strong> Property investments</li>
</ul>

<h3>Key Concepts</h3>
<ul>
  <li><strong>Compound Interest:</strong> Earning interest on interest</li>
  <li><strong>Diversification:</strong> Don't put all eggs in one basket</li>
  <li><strong>Risk vs Return:</strong> Higher potential returns = higher risk</li>
  <li><strong>Time Horizon:</strong> Longer time = more risk tolerance</li>
</ul>

<h3>The Rule of 72</h3>
<p>Divide 72 by your interest rate to estimate how long it takes to double your money. At 8%, money doubles in 9 years.</p>`
      },
      {
        title: 'Retirement Planning',
        order: 5,
        content: `<h2>Preparing for the Future</h2>
<p>It's never too early to start planning for retirement. The earlier you start, the more time compound interest has to work.</p>

<h3>Retirement Accounts</h3>
<ul>
  <li><strong>401(k):</strong> Employer-sponsored, often with matching</li>
  <li><strong>Traditional IRA:</strong> Tax-deferred contributions</li>
  <li><strong>Roth IRA:</strong> Tax-free withdrawals in retirement</li>
  <li><strong>SEP IRA:</strong> For self-employed individuals</li>
</ul>

<h3>How Much to Save</h3>
<ul>
  <li>Aim for 15% of income</li>
  <li>At minimum, get full employer match</li>
  <li>Increase by 1% each year</li>
</ul>

<h3>The 4% Rule</h3>
<p>You can withdraw 4% of your retirement savings annually without running out of money. To generate $40,000/year, you need $1,000,000 saved.</p>`
      },
      {
        title: 'Protecting Your Finances',
        order: 6,
        content: `<h2>Insurance and Protection</h2>
<p>Financial protection through insurance prevents unexpected events from derailing your financial plans.</p>

<h3>Essential Insurance Types</h3>
<ul>
  <li><strong>Health Insurance:</strong> Covers medical expenses</li>
  <li><strong>Auto Insurance:</strong> Required for vehicle owners</li>
  <li><strong>Homeowners/Renters:</strong> Protects your property</li>
  <li><strong>Life Insurance:</strong> Provides for dependents</li>
  <li><strong>Disability Insurance:</strong> Replaces income if unable to work</li>
</ul>

<h3>Identity Protection</h3>
<ul>
  <li>Monitor credit reports regularly</li>
  <li>Use strong, unique passwords</li>
  <li>Be wary of phishing attempts</li>
  <li>Freeze credit if not applying for new accounts</li>
</ul>`
      }
    ],
    quizQuestions: [
      { text: 'What is the 50/30/20 rule?', options: ['50% savings, 30% needs, 20% wants', '50% needs, 30% wants, 20% savings', '50% wants, 30% savings, 20% needs', '50% taxes, 30% needs, 20% wants'], correctIndex: 1 },
      { text: 'How much should a full emergency fund cover?', options: ['1 month of expenses', '3 months of expenses', '6 months of expenses', '12 months of expenses'], correctIndex: 2 },
      { text: 'Which debt payoff method saves the most money?', options: ['Snowball', 'Avalanche', 'Minimum payments', 'Consolidation'], correctIndex: 1 },
      { text: 'What does the Rule of 72 calculate?', options: ['Tax rate', 'Time to double money', 'Retirement age', 'Interest rate'], correctIndex: 1 },
      { text: 'What does a Roth IRA offer?', options: ['Tax-deferred contributions', 'Employer matching', 'Tax-free withdrawals', 'No contribution limits'], correctIndex: 2 },
      { text: 'What is the recommended retirement savings rate?', options: ['5% of income', '10% of income', '15% of income', '25% of income'], correctIndex: 2 }
    ]
  }
];

async function main() {
  console.log('Starting seed...');

  // Clean existing data
  await prisma.quizAttempt.deleteMany();
  await prisma.lessonProgress.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.question.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  // Create admin user
  const hashedPassword = await bcrypt.hash('johndoe123', 10);
  await prisma.user.create({
    data: {
      email: 'john@doe.com',
      password: hashedPassword,
      name: 'John Doe',
      role: 'admin',
    },
  });
  console.log('Created admin user');

  // Create courses with lessons and quizzes
  for (const courseData of courses) {
    const course = await prisma.course.create({
      data: {
        title: courseData.title,
        description: courseData.description,
        imageUrl: courseData.imageUrl,
        category: courseData.category,
        difficulty: courseData.difficulty,
        duration: courseData.duration,
      },
    });

    // Create lessons
    for (const lessonData of courseData.lessons) {
      await prisma.lesson.create({
        data: {
          title: lessonData.title,
          content: lessonData.content,
          videoUrl: lessonData.videoUrl || null,
          order: lessonData.order,
          courseId: course.id,
        },
      });
    }

    // Create quiz
    const quiz = await prisma.quiz.create({
      data: {
        title: `${courseData.title} Assessment`,
        courseId: course.id,
      },
    });

    // Create questions
    for (let i = 0; i < courseData.quizQuestions.length; i++) {
      const q = courseData.quizQuestions[i];
      await prisma.question.create({
        data: {
          text: q.text,
          options: q.options,
          correctIndex: q.correctIndex,
          order: i + 1,
          quizId: quiz.id,
        },
      });
    }

    console.log(`Created course: ${course.title}`);
  }

  console.log('Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
