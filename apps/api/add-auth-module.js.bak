const fs = require('fs');
const appModulePath = 'src/app.module.ts';

console.log("í´§ Adding AuthModule to AppModule imports...");

let content = fs.readFileSync(appModulePath, 'utf8');

// 1. Add the import statement for AuthModule
if (!content.includes("import { AuthModule }")) {
  // Add import after HealthModule import
  const healthModuleImport = "import { HealthModule } from './modules/health/health.module';";
  const authModuleImport = "import { AuthModule } from './modules/auth/auth.module';";
  
  content = content.replace(
    healthModuleImport,
    healthModuleImport + '\n' + authModuleImport
  );
  console.log("âœ… Added AuthModule import");
}

// 2. Add AuthModule to imports array
if (!content.includes('AuthModule,')) {
  // Find the imports array and add AuthModule after HealthModule
  const importsArray = content.match(/imports: \[[\s\S]*?\],/)[0];
  
  const updatedImports = importsArray.replace(
    '    HealthModule,',
    '    HealthModule,\n    AuthModule,'
  );
  
  content = content.replace(importsArray, updatedImports);
  console.log("âœ… Added AuthModule to imports array");
}

fs.writeFileSync(appModulePath, content, 'utf8');

console.log("í¾¯ AuthModule successfully added!");
console.log("íº€ Your auth routes will now work at:");
console.log("   POST /v1/auth/register");
console.log("   POST /v1/auth/login");
console.log("   POST /v1/auth/refresh");
console.log("   POST /v1/auth/logout");
